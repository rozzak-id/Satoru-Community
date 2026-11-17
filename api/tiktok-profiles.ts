const ALLOWED_AVATAR_HOST_SUFFIXES = [
  '.tiktokcdn.com',
  '.tiktokcdn-us.com',
  '.tiktokcdn-eu.com',
  '.ibytedtos.com',
  '.tiktokv.com',
  '.byteoversea.com',
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

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function parseFollowerCount(desc: string): number | null {
  if (!desc) return null;
  const match = desc.match(/([\d.,]+)([kmb])?\s+Followers/i);
  if (!match) return null;
  const numStr = match[1].replace(/,/g, '');
  let val = parseFloat(numStr);
  const unit = match[2] ? match[2].toLowerCase() : '';
  if (unit === 'k') val *= 1000;
  else if (unit === 'm') val *= 1000000;
  else if (unit === 'b') val *= 1000000000;
  return Math.round(val);
}

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

  // Strategy 1: Fetch with Social Media Bot UA (bypasses WAF, returns OpenGraph tags)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(profileUrl, {
      headers: {
        'User-Agent': 'Twitterbot/1.0',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const html = await res.text();
      const imgMatch =
        html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) ||
        html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/i);
      const titleMatch =
        html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
        html.match(/<title>([^<]+)<\/title>/i);
      const descMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);

      if (imgMatch) {
        const rawAvatar = decodeHtmlEntities(imgMatch[1]);
        const nickname = titleMatch
          ? decodeHtmlEntities(titleMatch[1]).replace(/\s+on TikTok$/i, '').trim()
          : `@${handle}`;
        const rawDesc = descMatch ? decodeHtmlEntities(descMatch[1]) : '';
        const followerCount = parseFollowerCount(rawDesc);

        return {
          handle,
          nickname,
          rawAvatarUrl: rawAvatar,
          avatarUrl:
            rawAvatar && isAllowedAvatarUrl(rawAvatar)
              ? `/api/tiktok-avatar?url=${encodeURIComponent(rawAvatar)}`
              : rawAvatar,
          followerCount,
          bio: rawDesc || null,
          profileUrl,
          source: 'tiktok-rehydration',
        };
      }
    }
  } catch {
    // Fall through to oEmbed
  }

  // Strategy 2: Official TikTok oEmbed fallback
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(profileUrl)}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = (await res.json()) as { author_name?: string; author_url?: string };
      return {
        handle,
        nickname: json.author_name || `@${handle}`,
        rawAvatarUrl: null,
        avatarUrl: null,
        followerCount: null,
        bio: null,
        profileUrl: json.author_url || profileUrl,
        source: 'tiktok-oembed',
      };
    }
  } catch {
    // Fall through to clean fallback
  }

  return {
    handle,
    nickname: `@${handle}`,
    rawAvatarUrl: null,
    avatarUrl: null,
    followerCount: null,
    bio: null,
    profileUrl,
    source: 'fallback',
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const rawHandles = String(req.query?.handles || '');
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

  // Cache on Vercel Edge for 10 minutes, serve stale up to 1 hour
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
  res.status(200).json({ profiles, fetchedAt: new Date().toISOString() });
}
