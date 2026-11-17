import React, { useMemo, useState } from 'react';
import { Award, Clock, ExternalLink } from 'lucide-react';
import {
  HOF_PERDANA_SMA,
  HOF_SSA_S1,
  SITE_ASSETS,
  type HallOfFameEntry,
} from '../data/satoruData';
import { extractTikTokHandle, formatFollowerCount } from '../utils/satoruLogic';
import { useTikTokProfiles, type LiveTikTokProfile } from '../hooks/useTikTokProfiles';
import { HeroBanner } from '../components/HeroBanner';

type HofFilter = 'all' | 'sma' | 'ssa-s1';

interface CompactWinnerCardProps {
  entry: HallOfFameEntry;
  profile?: LiveTikTokProfile;
  loading: boolean;
}

function CompactWinnerCard({ entry, profile, loading }: CompactWinnerCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const handle = entry.handle || extractTikTokHandle(entry.winner);
  const avatarSrc = !imgFailed && profile?.avatarUrl ? profile.avatarUrl : null;
  const profileHref =
    profile?.profileUrl || (handle ? `https://www.tiktok.com/@${handle}` : null);
  const followerLabel = formatFollowerCount(profile?.followerCount);

  return (
    <article className="flex flex-col items-center text-center group">
      {/* Compact square avatar tile matching reference Google Site proportions */}
      <div className="w-full max-w-[155px] aspect-square rounded-lg overflow-hidden border border-[#DEDBD4] bg-white shadow-xs relative">
        {entry.isPending ? (
          <div className="w-full h-full bg-[#1C1B22] flex flex-col items-center justify-center p-3 text-white/75">
            <Clock className="w-5 h-5 mb-1.5 text-white/50" aria-hidden="true" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-white/80">
              SSA #S1
            </span>
          </div>
        ) : avatarSrc ? (
          <img
            src={avatarSrc}
            alt={`Foto profil TikTok ${entry.winner}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${entry.accentTone} flex flex-col items-center justify-center p-3 text-white`}
          >
            {loading ? (
              <div className="w-9 h-9 rounded-full bg-white/15 animate-pulse" aria-hidden="true" />
            ) : (
              <span className="font-display text-2xl font-bold tracking-tight text-white/95">
                {entry.monogram}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Centered compact category + handle below */}
      <div className="mt-2.5 px-1 max-w-[175px]">
        <h3 className="font-display text-xs sm:text-[13px] font-bold text-[#141318] leading-snug">
          {entry.category}
        </h3>

        {entry.isPending || !profileHref ? (
          <p className="mt-1 text-xs font-mono text-[#74707D]">{entry.winner}</p>
        ) : (
          <div className="mt-1 space-y-0.5">
            <a
              href={profileHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 text-xs font-mono font-semibold text-[#4C00B0] hover:underline break-all"
            >
              <span>{entry.winner}</span>
              <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
            </a>
            {profile?.nickname && profile.nickname !== entry.winner && (
              <p className="text-[11px] text-[#5E5B66] truncate" title={profile.nickname}>
                {profile.nickname}
              </p>
            )}
            {followerLabel && (
              <p className="text-[10px] font-mono text-[#74707D] tabular-nums">
                {followerLabel}
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function WinnerGrid({
  entries,
  profiles,
  loading,
}: {
  entries: HallOfFameEntry[];
  profiles: Record<string, LiveTikTokProfile>;
  loading: boolean;
}) {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-8 justify-items-center">
      {entries.map((entry) => {
        const handle = entry.handle || extractTikTokHandle(entry.winner);
        const profile = handle ? profiles[handle] : undefined;
        return (
          <CompactWinnerCard
            key={`${entry.category}-${entry.winner}`}
            entry={entry}
            profile={profile}
            loading={loading}
          />
        );
      })}
    </div>
  );
}

export function HallOfFamePage() {
  const [seasonFilter, setSeasonFilter] = useState<HofFilter>('all');

  const winnerHandles = useMemo(() => {
    const list = HOF_PERDANA_SMA.map((e) => e.handle || extractTikTokHandle(e.winner)).filter(
      (h): h is string => Boolean(h)
    );
    return Array.from(new Set(list));
  }, []);

  const { profiles, loading } = useTikTokProfiles(winnerHandles);

  return (
    <div>
      <HeroBanner
        title="Hall Of Fame"
        subtitle="Arsip Penerima Kemenangan Satoru Semester Awards"
        backgroundImage={SITE_ASSETS.heroHallOfFame}
      />

      <section className="bg-[#F8F7F4] border-b border-[#E5E3DD]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#E5E3DD]">
            <p className="text-sm sm:text-base text-[#27252E] text-center sm:text-left">
              Di sini adalah halaman khusus untuk penerima kemenangan Satoru Semester Awards!
            </p>

            <div
              className="flex items-center gap-1 p-1 bg-white border border-[#E5E3DD] rounded-lg shrink-0 overflow-x-auto max-w-full"
              role="tablist"
              aria-label="Filter Edisi Hall Of Fame"
            >
              {[
                { id: 'all' as const, label: 'Semua Edisi' },
                { id: 'sma' as const, label: 'Perdana SMA' },
                { id: 'ssa-s1' as const, label: 'SSA #S1' },
              ].map((tab) => {
                const active = seasonFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSeasonFilter(tab.id)}
                    className={`min-h-[40px] px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#4C00B0] text-white'
                        : 'bg-transparent text-[#5E5B66] hover:text-[#141318]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {(seasonFilter === 'all' || seasonFilter === 'sma') && (
            <div className="mt-10">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#141318]">
                  Pemenang <em className="italic">Perdana</em> SMA
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#5E5B66]">
                  Foto profil &amp; nama akun diambil langsung dari TikTok masing-masing pemenang.
                </p>
              </div>

              <WinnerGrid entries={HOF_PERDANA_SMA} profiles={profiles} loading={loading} />

              {/* Detail Tambahan */}
              <div className="max-w-4xl mx-auto mt-10 p-5 sm:p-7 rounded-xl bg-white border border-[#E5E3DD] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#F8F7F4] border border-[#E5E3DD] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[#B5945B]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#141318]">
                      Detail Tambahan
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#43404B] leading-relaxed max-w-2xl">
                      Para pemenang edisi perdana terpilih berdasarkan konsistensi penggunaan hashtag dedikasi <span className="font-mono font-medium text-[#141318]">#SatoruClan</span>, kualitas visual (Jedag-Jedug, Motion Graphics, Typography, 3D), serta keaktifan di event komunitas.
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#6E6A77] tabular-nums shrink-0">
                  8 Kategori · 6 Kreator Unik
                </div>
              </div>
            </div>
          )}

          {(seasonFilter === 'all' || seasonFilter === 'ssa-s1') && (
            <div className="mt-12 sm:mt-14 pt-10 sm:pt-12 border-t border-[#E5E3DD]">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#141318]">
                  Pemenang SSA #S1
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#5E5B66]">
                  Season 1 (Juli — Desember) · Nominasi diumumkan 10 Desember, pemenang diumumkan 15 Desember.
                </p>
              </div>

              <WinnerGrid entries={HOF_SSA_S1} profiles={profiles} loading={false} />

              <p className="mt-8 text-center text-sm text-[#6E6A77] font-mono">
                ...dan selanjutnya.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
