import { useEffect, useState } from 'react';

export interface LiveTikTokProfile {
  handle: string;
  nickname: string;
  avatarUrl: string | null;
  followerCount: number | null;
  bio: string | null;
  profileUrl: string;
  source: 'tiktok-rehydration' | 'tiktok-oembed' | 'fallback';
}

export function useTikTokProfiles(handles: string[]) {
  const handlesKey = Array.from(
    new Set(handles.map((h) => h.replace(/^@/, '').trim().toLowerCase()).filter(Boolean))
  )
    .sort()
    .join(',');

  const [profiles, setProfiles] = useState<Record<string, LiveTikTokProfile>>({});
  const [loading, setLoading] = useState<boolean>(Boolean(handlesKey));

  useEffect(() => {
    if (!handlesKey) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`/api/tiktok-profiles?handles=${encodeURIComponent(handlesKey)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to fetch'))))
      .then((data: { profiles?: Record<string, LiveTikTokProfile> }) => {
        if (!cancelled && data?.profiles) {
          setProfiles(data.profiles);
        }
      })
      .catch(() => {
        // Keep clean fallback state when offline or unavailable
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [handlesKey]);

  return { profiles, loading };
}
