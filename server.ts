import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PRODUCTION =
  process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_event === 'start';

export interface TikTokProfileSummary {
  handle: string;
  nickname: string;
  avatarUrl: string | null;
  rawAvatarUrl: string | null;
  followerCount: number | null;
  bio: string | null;
  profileUrl: string;
  source: 'tiktok-rehydration' | 'tiktok-oembed' | 'fallback';
}

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const CACHE_TTL_MS = 60 * 60 * 1000;
const profileCache = new Map<string, CacheEntry<TikTokProfileSummary>>();
const avatarCache = new Map<string, CacheEntry<{ contentType: string; buffer: Buffer }>>();

const MOBILE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

const ALLOWED_AVATAR_HOST_SUFFIXES = [
  '.tiktokcdn.com',
  '.tiktokcdn-us.com',
  '.tiktokcdn-eu.com',
  '.ibytedtos.com',
  '.tiktokv.com',
];

function isValidTikTokHandle(handle: string): boolean {
  return /^[a-zA-Z0-9._]{1,40}$/.test(handle);
}

function isAllowedAvatarUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return false;
    const host = parsed.hostname.toLowerCase();
    return ALLOWED_AVATAR_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));
  } catch {
    return false;
  }
}

async function fetchTikTokProfile(rawHandle: string): Promise<TikTokProfileSummary> {
  const handle = rawHandle.replace(/^@/, '').trim().toLowerCase();
  const profileUrl = `https://www.tiktok.com/@${handle}`;

  if (!isValidTikTokHandle(handle)) {
    return {
      handle,
      nickname: `@${handle}`,
      avatarUrl: null,
      rawAvatarUrl: null,
      followerCount: null,
      bio: null,
      profileUrl,
      source: 'fallback',
    };
  }

  const cached = profileCache.get(handle);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  // Primary strategy: TikTok profile HTML __UNIVERSAL_DATA_FOR_REHYDRATION__
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(profileUrl, {
      headers: {
        'User-Agent': MOBILE_UA,
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const html = await res.text();
      const match = html.match(
        /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/
      );
      if (match) {
        const parsed = JSON.parse(match[1]);
        const userInfo = parsed?.__DEFAULT_SCOPE__?.['webapp.user-detail']?.userInfo;
        const user = userInfo?.user;
        const stats = userInfo?.stats;
        if (user) {
          const rawAvatar = user.avatarMedium || user.avatarLarger || user.avatarThumb || null;
          const summary: TikTokProfileSummary = {
            handle: user.uniqueId || handle,
            nickname: user.nickname || `@${handle}`,
            rawAvatarUrl: rawAvatar,
            avatarUrl:
              rawAvatar && isAllowedAvatarUrl(rawAvatar)
                ? `/api/tiktok-avatar?url=${encodeURIComponent(rawAvatar)}`
                : null,
            followerCount: typeof stats?.followerCount === 'number' ? stats.followerCount : null,
            bio: typeof user.signature === 'string' ? user.signature : null,
            profileUrl: `https://www.tiktok.com/@${user.uniqueId || handle}`,
            source: 'tiktok-rehydration',
          };
          profileCache.set(handle, { value: summary, expiresAt: Date.now() + CACHE_TTL_MS });
          return summary;
        }
      }
    }
  } catch {
    // Fall through to TikTok oEmbed fallback
  }

  // Secondary strategy: TikTok official oEmbed endpoint
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(profileUrl)}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = (await res.json()) as { author_name?: string; author_url?: string };
      const summary: TikTokProfileSummary = {
        handle,
        nickname: json.author_name || `@${handle}`,
        rawAvatarUrl: null,
        avatarUrl: null,
        followerCount: null,
        bio: null,
        profileUrl: json.author_url || profileUrl,
        source: 'tiktok-oembed',
      };
      profileCache.set(handle, { value: summary, expiresAt: Date.now() + CACHE_TTL_MS });
      return summary;
    }
  } catch {
    // Fall through to clean fallback
  }

  const fallback: TikTokProfileSummary = {
    handle,
    nickname: `@${handle}`,
    rawAvatarUrl: null,
    avatarUrl: null,
    followerCount: null,
    bio: null,
    profileUrl,
    source: 'fallback',
  };
  return fallback;
}

async function startServer() {
  const app = express();

  app.get('/api/tiktok-profiles', async (req, res) => {
    const rawHandles = String(req.query.handles || '');
    const handles = Array.from(
      new Set(
        rawHandles
          .split(',')
          .map((h) => h.replace(/^@/, '').trim().toLowerCase())
          .filter((h) => isValidTikTokHandle(h))
      )
    ).slice(0, 16);

    if (handles.length === 0) {
      res.status(400).json({ error: 'Parameter handles diperlukan.' });
      return;
    }

    const entries = await Promise.all(
      handles.map(async (handle) => [handle, await fetchTikTokProfile(handle)] as const)
    );

    const profiles: Record<string, TikTokProfileSummary> = {};
    for (const [handle, profile] of entries) {
      profiles[handle] = profile;
    }

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json({ profiles, fetchedAt: new Date().toISOString() });
  });

  app.get('/api/tiktok-avatar', async (req, res) => {
    const rawUrl = String(req.query.url || '');
    if (!isAllowedAvatarUrl(rawUrl)) {
      res.status(400).send('Invalid avatar URL');
      return;
    }

    const cached = avatarCache.get(rawUrl);
    if (cached && cached.expiresAt > Date.now()) {
      res.setHeader('Content-Type', cached.value.contentType);
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.send(cached.value.buffer);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const upstream = await fetch(rawUrl, {
        headers: {
          'User-Agent': MOBILE_UA,
          Referer: 'https://www.tiktok.com/',
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!upstream.ok) {
        res.status(502).send('Avatar unavailable');
        return;
      }

      const contentType = upstream.headers.get('content-type') || 'image/jpeg';
      if (!contentType.startsWith('image/')) {
        res.status(502).send('Invalid content type');
        return;
      }

      const arrayBuf = await upstream.arrayBuffer();
      const buffer = Buffer.from(arrayBuf);
      avatarCache.set(rawUrl, {
        value: { contentType, buffer },
        expiresAt: Date.now() + CACHE_TTL_MS,
      });

      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.send(buffer);
    } catch {
      res.status(502).send('Failed to load avatar');
    }
  });

  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Satoru Community server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
