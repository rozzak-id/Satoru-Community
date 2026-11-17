import type { EventItem, PageRoute } from '../data/satoruData';

export interface JoinFormInput {
  tiktokUsername: string;
  tiktokUrl: string;
  whatsappNumber: string;
  software: string;
  editingStyle: string;
  timeline: string;
  followedOfficial: boolean;
}

export interface JoinValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof JoinFormInput, string>>;
}

export function normalizeRoute(pathname: string): PageRoute {
  const clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (clean === '' || clean === 'main-page' || clean.endsWith('/main-page')) {
    return 'main-page';
  }
  if (clean === 'partnership' || clean.endsWith('/partnership')) {
    return 'partnership';
  }
  if (clean === 'division' || clean.endsWith('/division')) {
    return 'division';
  }
  if (clean === 'awards' || clean.endsWith('/awards')) {
    return 'awards';
  }
  if (clean === 'hall-of-fame' || clean.endsWith('/hall-of-fame')) {
    return 'hall-of-fame';
  }
  if (clean === 'admins' || clean.endsWith('/admins')) {
    return 'admins';
  }
  if (clean === 'join-satoru-now' || clean.endsWith('/join-satoru-now')) {
    return 'join-satoru-now';
  }
  return 'main-page';
}

export function extractTikTokHandle(winner: string): string | null {
  const clean = winner.replace(/^@+/, '').trim().toLowerCase();
  if (!clean || clean === 'not yet' || /\s/.test(clean)) {
    return null;
  }
  if (!/^[a-z0-9._]{1,40}$/.test(clean)) {
    return null;
  }
  return clean;
}

export function formatFollowerCount(count?: number | null): string {
  if (typeof count !== 'number' || !Number.isFinite(count) || count < 0) {
    return '';
  }
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M followers`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K followers`;
  }
  return `${count} followers`;
}

export function filterEvents(
  events: EventItem[],
  category: 'all' | EventItem['category'],
  query: string
): EventItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  return events.filter((event) => {
    const matchesCategory = category === 'all' || event.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      event.title.toLowerCase().includes(normalizedQuery) ||
      event.categoryLabel.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function filterPartners(
  partners: string[],
  query: string
): Array<{ index: number; name: string }> {
  const normalizedQuery = query.trim().toLowerCase();
  return partners
    .map((name, idx) => ({ index: idx + 1, name }))
    .filter((item) => !normalizedQuery || item.name.toLowerCase().includes(normalizedQuery));
}

export function formatDedicationNames(rawName: string): {
  kanji: string;
  star: string;
  dotStr: string;
} {
  const clean = rawName.trim() || 'Name';
  return {
    kanji: `${clean}悟`,
    star: `${clean}-✧`,
    dotStr: `${clean}.str`,
  };
}

export function validateJoinForm(input: JoinFormInput): JoinValidationResult {
  const errors: Partial<Record<keyof JoinFormInput, string>> = {};

  if (!input.tiktokUsername.trim()) {
    errors.tiktokUsername = 'Nama akun TikTok wajib diisi.';
  }

  const trimmedUrl = input.tiktokUrl.trim();
  if (!trimmedUrl) {
    errors.tiktokUrl = 'Link akun TikTok wajib diisi.';
  } else if (!/^https?:\/\/.+/i.test(trimmedUrl)) {
    errors.tiktokUrl = 'Link TikTok harus diawali dengan https:// atau http://.';
  }

  const digits = input.whatsappNumber.replace(/[^\d+]/g, '');
  if (!digits || digits.length < 9) {
    errors.whatsappNumber = 'Masukkan nomor WhatsApp aktif yang valid (minimal 9 digit).';
  }

  if (!input.software.trim()) {
    errors.software = 'Pilih atau isi software editing yang digunakan.';
  }

  if (!input.timeline.trim()) {
    errors.timeline = 'Waktu pengerjaan (timeline) editan wajib diisi.';
  }

  if (!input.followedOfficial) {
    errors.followedOfficial = 'Pastikan kamu sudah follow akun TikTok @SatoruClanOfc terlebih dahulu.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildJoinMessage(input: JoinFormInput): string {
  const username = input.tiktokUsername.trim().startsWith('@')
    ? input.tiktokUsername.trim()
    : `@${input.tiktokUsername.trim()}`;

  return [
    'Halo Admin Satoru Community, salam kenal! Saya ingin mengikuti seleksi member Satoru.',
    '',
    `Nama Akun TikTok: ${username}`,
    `Link Akun TikTok: ${input.tiktokUrl.trim()}`,
    `Nomor WhatsApp: ${input.whatsappNumber.trim()}`,
    `Software & Style: ${input.software.trim()} (${input.editingStyle.trim() || 'All Style'})`,
    `Timeline / Waktu Pengerjaan: ${input.timeline.trim()}`,
    '',
    'Berikut saya lampirkan video editan & bukti timeline pengerjaan saya. Terima kasih!',
  ].join('\n');
}
