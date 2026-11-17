import React, { useState } from 'react';
import { Clock, ExternalLink, Shield, Users } from 'lucide-react';
import {
  ADMIN_FOUNDERS_AND_LEADERS,
  ADMIN_ROLES_OVERVIEW,
  OFFICIAL_LINKS,
  SITE_ASSETS,
  type PageRoute,
} from '../data/satoruData';
import { formatFollowerCount } from '../utils/satoruLogic';
import { useTikTokProfiles } from '../hooks/useTikTokProfiles';
import { HeroBanner } from '../components/HeroBanner';

interface AdminsPageProps {
  onNavigate: (page: PageRoute) => void;
}

export function AdminsPage({ onNavigate }: AdminsPageProps) {
  const handles = ADMIN_FOUNDERS_AND_LEADERS.map((a) => a.handle);
  const { profiles, loading } = useTikTokProfiles(handles);
  const [failedAvatars, setFailedAvatars] = useState<Record<string, boolean>>({});

  return (
    <div>
      <HeroBanner
        title="Admins"
        subtitle="Pengurus & Penanggung Jawab Resmi Satoru Community"
        metaLine="Founder @KeanoPreset · Daftar Admin Lengkap Akan Segera Diperbarui"
        backgroundImage={SITE_ASSETS.heroWave}
      />

      {/* Founder & Lead Admin Section */}
      <section className="bg-white border-b border-[#E5E3DD]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141318]">
              Founder &amp; Pimpinan Komunitas
            </h2>
            <div className="mx-auto mt-3 h-[2px] w-14 bg-[#B5945B]" aria-hidden="true" />
          </div>

          <div className="mt-8 max-w-2xl mx-auto">
            {ADMIN_FOUNDERS_AND_LEADERS.map((admin) => {
              const profile = profiles[admin.handle.toLowerCase()];
              const avatarSrc =
                !failedAvatars[admin.handle] && profile?.avatarUrl ? profile.avatarUrl : null;
              const followers = formatFollowerCount(profile?.followerCount);

              return (
                <article
                  key={admin.id}
                  className="p-5 sm:p-7 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD] flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#141318] border border-[#DEDBD4] shrink-0 flex items-center justify-center text-white">
                    {avatarSrc ? (
                      <img
                        src={avatarSrc}
                        alt={`Foto profil TikTok @${admin.handle}`}
                        onError={() =>
                          setFailedAvatars((prev) => ({ ...prev, [admin.handle]: true }))
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : loading ? (
                      <div className="w-10 h-10 rounded-full bg-white/15 animate-pulse" />
                    ) : (
                      <span className="font-display text-2xl font-bold">KN</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4C00B0]">
                        <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{admin.role}</span>
                      </span>
                      <span className="font-mono text-xs text-[#6E6A77]">{admin.division}</span>
                    </div>

                    <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#141318]">
                      {profile?.nickname || admin.name}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                      <a
                        href={admin.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#4C00B0] hover:underline"
                      >
                        <span>@{admin.handle}</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                      {followers && (
                        <span className="text-xs font-mono text-[#6E6A77] tabular-nums">
                          {followers}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-sm text-[#43404B] leading-relaxed">{admin.note}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Admin Roster Notice (Ready for Full List) */}
      <section className="bg-[#F8F7F4] border-b border-[#E5E3DD]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141318]">
              Daftar Admin Resmi Satoru
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5E5B66]">
              Halaman ini disiapkan untuk menampilkan seluruh jajaran admin aktif Satoru Community beserta tugas dan kontak resminya.
            </p>
          </div>

          <div className="mt-8 p-6 sm:p-8 rounded-xl bg-white border border-dashed border-[#C8C3B8] text-center max-w-3xl mx-auto">
            <div className="mx-auto w-11 h-11 rounded-lg bg-[#F8F7F4] border border-[#E5E3DD] flex items-center justify-center text-[#B5945B]">
              <Clock className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-[#141318]">
              Daftar Admin Lengkap Segera Ditambahkan
            </h3>
            <p className="mt-2 text-sm text-[#43404B] leading-relaxed max-w-xl mx-auto">
              Daftar akun dan kontak para admin sedang dalam tahap pembaruan. Untuk keperluan seleksi member saat ini, silakan masuk ke Grup Seleksi WhatsApp resmi atau ikuti panduan pada halaman Join Satoru.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a
                href={OFFICIAL_LINKS.whatsappSelectionGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-[#141318] text-white hover:bg-[#2E2B36] transition-colors"
              >
                <span>Grup Seleksi WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => onNavigate('join-satoru-now')}
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md border border-[#D8D4CC] bg-[#F8F7F4] text-[#141318] hover:border-[#4C00B0] transition-colors cursor-pointer"
              >
                <Users className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Lihat Syarat Seleksi Member</span>
              </button>
            </div>
          </div>

          {/* Admin Responsibilities Overview */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {ADMIN_ROLES_OVERVIEW.map((item, index) => (
              <div
                key={item.title}
                className="p-5 sm:p-6 rounded-xl bg-white border border-[#E5E3DD]"
              >
                <span className="font-mono text-xs font-semibold text-[#4C00B0]">
                  Peran 0{index + 1}
                </span>
                <h3 className="mt-1.5 text-base font-bold text-[#141318]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#5E5B66] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
