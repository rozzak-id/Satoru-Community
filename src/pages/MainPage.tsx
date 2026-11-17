import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Check, Copy, ExternalLink, Search } from 'lucide-react';
import {
  COMMUNITY_STATS,
  DEDICATION_HASHTAGS,
  EVENT_RESULTS,
  INTRO_BREAKDOWN,
  MAIN_LOGOS,
  OFFICIAL_LINKS,
  SEASONAL_CHAPTERS,
  SIDE_LOGOS,
  SITE_ASSETS,
  type EventItem,
  type PageRoute,
} from '../data/satoruData';
import { filterEvents, formatDedicationNames } from '../utils/satoruLogic';
import { HeroBanner } from '../components/HeroBanner';
import {
  HollowStarMark,
  LightningCurseMark,
  TenkaiHandMark,
} from '../components/SatoruEmblems';

interface MainPageProps {
  onNavigate: (page: PageRoute) => void;
}

type EventFilterCategory = 'all' | EventItem['category'];

const CATEGORY_TABS: Array<{ id: EventFilterCategory; label: string; count: number }> = [
  { id: 'all', label: 'Semua Event', count: EVENT_RESULTS.length },
  {
    id: 'mep',
    label: 'MEP Edits',
    count: EVENT_RESULTS.filter((e) => e.category === 'mep').length,
  },
  {
    id: 'collab-jj',
    label: 'Collab Style Jedag Jedug',
    count: EVENT_RESULTS.filter((e) => e.category === 'collab-jj').length,
  },
  {
    id: 'other-collabs',
    label: 'Other Collabs',
    count: EVENT_RESULTS.filter((e) => e.category === 'other-collabs').length,
  },
];

export function MainPage({ onNavigate }: MainPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<EventFilterCategory>('all');
  const [eventQuery, setEventQuery] = useState('');
  const [nicknameInput, setNicknameInput] = useState('Name');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [sideLogoTone, setSideLogoTone] = useState<'black' | 'white'>('black');

  const filteredEvents = useMemo(
    () => filterEvents(EVENT_RESULTS, selectedCategory, eventQuery),
    [selectedCategory, eventQuery]
  );

  const nameVariants = useMemo(
    () => formatDedicationNames(nicknameInput),
    [nicknameInput]
  );

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 2000);
    } catch {
      // Fallback ignored in environments without clipboard permission
    }
  };

  return (
    <div>
      {/* 1. Hero Banner */}
      <HeroBanner
        title="SATORU COMMUNITY"
        subtitle="Information"
        metaLine="Berdiri 13 Januari 2025 · Didirikan oleh @KeanoPreset · All Style & Software"
        backgroundImage={SITE_ASSETS.heroWave}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto">
          <a
            href="#event-results"
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-md bg-white text-[#141318] hover:bg-neutral-100 transition-colors whitespace-nowrap"
          >
            Lihat Hasil Event ({EVENT_RESULTS.length})
          </a>
          <button
            type="button"
            onClick={() => onNavigate('join-satoru-now')}
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-md border border-white/35 text-white hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
          >
            Cara Gabung Satoru
          </button>
        </div>
      </HeroBanner>

      {/* Full-width Community KPI Strip */}
      <section className="bg-white border-b border-[#E5E3DD]" aria-label="Ringkasan Komunitas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {COMMUNITY_STATS.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-xs font-medium text-[#5E5B66]">{stat.label}</p>
                <p className="font-display text-2xl sm:text-4xl font-bold text-[#141318] tabular-nums">
                  {stat.value}
                </p>
                <p className="text-[11px] sm:text-xs text-[#6E6A77] leading-snug">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Satoru Basic Information */}
      <section className="bg-[#F8F7F4] border-b border-[#E5E3DD]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#141318]">
            Satoru Basic Information
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-14 bg-[#B5945B]" aria-hidden="true" />

          <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6 text-sm sm:text-base text-[#27252E] leading-relaxed text-left sm:text-center">
            <p>
              Satoru Community adalah komunitas editing yang berdiri pada tanggal{' '}
              <strong className="font-semibold text-[#141318]">13 Januari 2025</strong> dan didirikan oleh{' '}
              <strong className="font-semibold text-[#141318]">@KeanoPreset</strong>. Satoru memiliki beberapa tempat untuk mengupdate informasi terbaru terkait komunitas satoru, ada di TikTok{' '}
              <a
                href={OFFICIAL_LINKS.tiktokOfficial}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#4C00B0] hover:underline"
              >
                @SatoruClanOfc
              </a>
              , Instagram{' '}
              <a
                href={OFFICIAL_LINKS.instagramOfficial}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#4C00B0] hover:underline"
              >
                @SatoruClanOfc
              </a>
              , dan Saluran WhatsApp.
            </p>

            <p>
              Satoru Community adalah satu-satunya komunitas editing yang menerima{' '}
              <strong className="font-semibold text-[#141318]">semua style editing</strong> dan{' '}
              <strong className="font-semibold text-[#141318]">semua aplikasi/software editing</strong>, maupun itu After Effect, Alight Motion, Blurr, atau <em>Capcut</em>!
            </p>

            <p>
              Nama <strong className="font-semibold text-[#141318]">Satoru</strong> diambil dari nama karakter anime &ldquo;Gojo Satoru&rdquo; dari Jujutsu Kaisen, dan mengambil arti dari{' '}
              <em className="italic text-[#141318]">
                bijaksana, cepat belajar, cerdas, memahami, atau pengetahuan
              </em>
              .
            </p>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
            <a
              href={OFFICIAL_LINKS.tiktokOfficial}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-md bg-white border border-[#DEDBD4] text-[#141318] font-medium hover:border-[#4C00B0] transition-colors"
            >
              <span>TikTok @SatoruClanOfc</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#5E5B66]" />
            </a>
            <a
              href={OFFICIAL_LINKS.tiktokFounder}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-md bg-white border border-[#DEDBD4] text-[#141318] font-medium hover:border-[#4C00B0] transition-colors"
            >
              <span>Founder @KeanoPreset</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#5E5B66]" />
            </a>
            <a
              href={OFFICIAL_LINKS.instagramOfficial}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-md bg-white border border-[#DEDBD4] text-[#141318] font-medium hover:border-[#4C00B0] transition-colors"
            >
              <span>Instagram @SatoruClanOfc</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#5E5B66]" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Official Property: 3 Main SVG Logos + Side Logos Image */}
      <section className="bg-white border-b border-[#E5E3DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#141318]">
              Official Property.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5E5B66]">
              Satoru memiliki 3 Logo Utama dan beberapa logo sampingan lainnya.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {MAIN_LOGOS.map((logo) => (
              <div
                key={logo.id}
                className="flex flex-col items-center text-center p-6 sm:p-8 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD]"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center rounded-xl bg-white border border-[#E5E3DD] text-[#141318]">
                  {logo.id === 'hollow-star' && <HollowStarMark className="w-20 h-20 sm:w-24 sm:h-24" />}
                  {logo.id === 'tenkai-hand' && <TenkaiHandMark className="w-20 h-20 sm:w-24 sm:h-24" />}
                  {logo.id === 'lightning-curse' && <LightningCurseMark className="w-20 h-20 sm:w-24 sm:h-24" />}
                </div>
                <h3 className="mt-5 text-lg sm:text-xl font-bold text-[#141318]">{logo.name}</h3>
                <p className="mt-2 text-sm text-[#5E5B66] leading-relaxed">{logo.description}</p>
              </div>
            ))}
          </div>

          {/* Logo Sampingan Satoru (Uploaded PNG Artwork styled in Black or White) */}
          <div className="mt-12 sm:mt-14 pt-12 sm:pt-14 border-t border-[#E5E3DD] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-xs font-mono text-[#6E6A77]">
                  Koleksi Logo Sampingan (7 Varian)
                </span>
                <div
                  className="inline-flex items-center p-1 rounded-lg bg-[#F8F7F4] border border-[#E5E3DD]"
                  role="group"
                  aria-label="Mode warna logo sampingan"
                >
                  <button
                    type="button"
                    onClick={() => setSideLogoTone('black')}
                    aria-pressed={sideLogoTone === 'black'}
                    className={`min-h-[36px] px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      sideLogoTone === 'black'
                        ? 'bg-[#141318] text-white'
                        : 'text-[#5E5B66] hover:text-[#141318]'
                    }`}
                  >
                    Hitam
                  </button>
                  <button
                    type="button"
                    onClick={() => setSideLogoTone('white')}
                    aria-pressed={sideLogoTone === 'white'}
                    className={`min-h-[36px] px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      sideLogoTone === 'white'
                        ? 'bg-[#141318] text-white'
                        : 'text-[#5E5B66] hover:text-[#141318]'
                    }`}
                  >
                    Putih
                  </button>
                </div>
              </div>

              <div
                className={`rounded-xl border p-4 sm:p-6 transition-colors ${
                  sideLogoTone === 'white'
                    ? 'bg-[#0B0B0F] border-[#1F1E26]'
                    : 'bg-white border-[#E5E3DD]'
                }`}
              >
                <img
                  src={SITE_ASSETS.sideLogosSheet}
                  alt="Daftar Logo Sampingan Satoru: Kanji V2, Pixelated Hollow Star, Project V1, Coming Soon, Fallen Text, dan Project V2"
                  className={`w-full h-auto rounded-md transition-all duration-200 ${
                    sideLogoTone === 'white'
                      ? 'invert contrast-125'
                      : 'contrast-125'
                  }`}
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#141318]">
                Logo Sampingan Satoru
              </h3>
              <div className="mt-3 h-[2px] w-14 bg-[#B5945B]" aria-hidden="true" />
              <p className="mt-4 sm:mt-5 text-sm sm:text-[15px] text-[#43404B] leading-relaxed">
                Satoru memiliki logo-logo tersebut dengan beberapa alasan yang jelas, salah satunya untuk pembuatan intro yang lebih fleksibel dan bervariasi.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-[#5E5B66]">
                {SIDE_LOGOS.map((side) => (
                  <li key={side.id} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-semibold text-[#141318]">{side.name}</span>
                    <span aria-hidden="true">·</span>
                    <span>{side.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Just For Your Information: Monthly Seasonal Chapters */}
      <section className="bg-[#F8F7F4] border-b border-[#E5E3DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display italic text-2xl sm:text-4xl font-bold text-[#141318]">
              Just For Your Information
            </h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#27252E] leading-relaxed">
              Satoru bukan hanya komunitas editing yang temanya menetap begitu saja (membosankan), tetapi kami juga memiliki{' '}
              <strong className="font-semibold text-[#141318]">chapter (musiman) setiap bulan</strong>! Contohnya, bulan Desember 2025 kami menetapkan Satoru dalam tema{' '}
              <strong className="font-semibold text-[#141318]">Freezing Land</strong> yang berarti lahan yang membeku (tema Natal / Musim Salju), dan di bulan Ramadhan Satoru menetapkan tema Ramadhan, begitu juga acara lainnya.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {SEASONAL_CHAPTERS.map((chapter, idx) => (
              <div
                key={chapter.title}
                className="p-5 sm:p-6 rounded-xl bg-white border border-[#E5E3DD] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6E6A77] font-mono">
                    <span>0{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span>{chapter.period}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-[#141318]">{chapter.title}</h3>
                  <p className="mt-2 text-sm text-[#5E5B66] leading-relaxed">{chapter.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dedication Section */}
      <section className="bg-white border-b border-[#E5E3DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#141318]">
              Dedication.
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#27252E] leading-relaxed">
              Satoru mewajibkan anggotanya untuk dedic, karena dedic sebagai pengabdian, penanda, dan pengakuan dari anggota itu sendiri bahwa mereka adalah bagian dari komunitas Satoru. Dedic dibagi menjadi <strong className="underline">3</strong>, yakni:
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {/* 01. Hashtag */}
            <div className="p-5 sm:p-7 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD] flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono text-[#6E6A77]">01 · TikTok Wajib</p>
                <h3 className="mt-1 text-xl font-bold text-[#141318]">Hashtag</h3>
                <p className="mt-3 text-sm text-[#43404B] leading-relaxed">
                  Hashtag digunakan di platform TikTok, wajib dipakai di setiap konten TikTok yang diupload anggota.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-white border border-[#E5E3DD] font-mono text-xs text-[#141318] leading-relaxed break-words">
                  {DEDICATION_HASHTAGS.join(' ')}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('hashtags', DEDICATION_HASHTAGS.join(' '))}
                className="mt-5 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-[#141318] text-white hover:bg-[#2E2B36] transition-colors cursor-pointer"
              >
                {copiedKey === 'hashtags' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Hashtag Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Hashtag Dedic</span>
                  </>
                )}
              </button>
            </div>

            {/* 02. Change Name (Interactive Preview) */}
            <div className="p-5 sm:p-7 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD] flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono text-[#6E6A77]">02 · Semua Platform (Disarankan TikTok)</p>
                <h3 className="mt-1 text-xl font-bold text-[#141318]">Change Name</h3>
                <p className="mt-3 text-sm text-[#43404B] leading-relaxed">
                  Coba ketik nama editor kamu untuk melihat dan menyalin format Change Name resmi Satoru:
                </p>
                <div className="mt-4">
                  <label htmlFor="dedic-name-input" className="sr-only">
                    Nama Editor untuk Change Name
                  </label>
                  <input
                    id="dedic-name-input"
                    type="text"
                    value={nicknameInput}
                    onChange={(e) => setNicknameInput(e.target.value)}
                    placeholder="Ketik namamu..."
                    maxLength={24}
                    className="w-full min-h-[44px] px-3 py-2 text-base sm:text-sm bg-white border border-[#D8D4CC] rounded-md text-[#141318] focus:outline-none focus:border-[#4C00B0]"
                  />
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    { key: 'kanji', value: nameVariants.kanji },
                    { key: 'star', value: nameVariants.star },
                    { key: 'dotStr', value: nameVariants.dotStr },
                  ].map((variant) => (
                    <div
                      key={variant.key}
                      className="flex items-center justify-between px-3 py-2 min-h-[44px] rounded-md bg-white border border-[#E5E3DD]"
                    >
                      <span className="font-mono text-sm font-medium text-[#141318] truncate pr-2">
                        {variant.value}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(variant.key, variant.value)}
                        aria-label={`Salin ${variant.value}`}
                        className="inline-flex items-center gap-1 min-h-[36px] px-2 text-xs font-medium text-[#4C00B0] hover:underline shrink-0 cursor-pointer"
                      >
                        {copiedKey === variant.key ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Disalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 03. Property & Intro Breakdown */}
            <div className="p-5 sm:p-7 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD] flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono text-[#6E6A77]">03 · Khusus Anggota Satoru</p>
                <h3 className="mt-1 text-xl font-bold text-[#141318]">Property.</h3>
                <p className="mt-3 text-sm text-[#43404B] leading-relaxed">
                  Property Satoru dapat digunakan di semua platform dan semua konten. Properti ini bersifat khusus Satoru (bukan untuk publik) melainkan hanya boleh digunakan oleh anggota Satoru saja.
                </p>

                <div className="mt-5 pt-4 border-t border-[#E5E3DD]">
                  <p className="text-xs font-semibold text-[#141318]">
                    Distribusi ~100 Intro Satoru (5/8/26)
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {INTRO_BREAKDOWN.map((item) => (
                      <div key={item.creator}>
                        <div className="flex items-center justify-between text-xs text-[#43404B]">
                          <span>{item.creator}</span>
                          <span className="font-mono tabular-nums font-semibold">
                            {item.percentage}%
                          </span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-[#E5E3DD] overflow-hidden">
                          <div
                            className="h-full bg-[#4C00B0] rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Satoru Event Results */}
      <section id="event-results" className="bg-[#F8F7F4] border-b border-[#E5E3DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#141318]">
              Satoru Event Results
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#27252E] leading-relaxed">
              Satoru mengadakan event hampir setiap minggunya, dan setiap beberapa bulan Satoru mengadakan event yang cukup besar. Berikut hasil dari beberapa event besar kami!
            </p>
            <p className="mt-2 text-xs text-[#6E6A77]">
              Catatan: beberapa event mingguan mungkin tidak masuk dalam daftar ini karena hanya menampilkan event berskala besar.
            </p>
          </div>

          {/* Mobile-scrollable Filter Tabs & Search Bar */}
          <div className="mt-8 sm:mt-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
            <div
              className="flex items-center gap-1.5 p-1.5 bg-white border border-[#E5E3DD] rounded-lg overflow-x-auto"
              role="tablist"
              aria-label="Filter Kategori Event"
            >
              {CATEGORY_TABS.map((tab) => {
                const active = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`min-h-[40px] px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#141318] text-white'
                        : 'text-[#5E5B66] hover:text-[#141318] hover:bg-[#F8F7F4]'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-80">
              <label htmlFor="event-search-input" className="sr-only">
                Cari arsip event TikTok
              </label>
              <Search className="w-4 h-4 text-[#6E6A77] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="event-search-input"
                type="search"
                value={eventQuery}
                onChange={(e) => setEventQuery(e.target.value)}
                placeholder="Cari event (misal: Ramadhan, Ultra Mep)..."
                className="w-full min-h-[44px] pl-9 pr-3 py-2 text-base sm:text-sm bg-white border border-[#D8D4CC] rounded-lg text-[#141318] placeholder:text-[#8A8594] focus:outline-none focus:border-[#4C00B0]"
              />
            </div>
          </div>

          <p className="mt-4 text-xs font-mono text-[#5E5B66] tabular-nums">
            Menampilkan {filteredEvents.length} dari {EVENT_RESULTS.length} arsip event resmi
          </p>

          {/* Event Grid */}
          {filteredEvents.length === 0 ? (
            <div className="mt-6 sm:mt-8 p-8 sm:p-10 text-center bg-white border border-[#E5E3DD] rounded-xl">
              <p className="text-sm font-medium text-[#141318]">
                Tidak ada event yang cocok dengan pencarian &ldquo;{eventQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setEventQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 min-h-[44px] px-4 py-2 text-xs font-semibold rounded-md bg-[#141318] text-white cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
              {filteredEvents.map((event) => (
                <a
                  key={event.id}
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-4 rounded-xl bg-white border border-[#E5E3DD] hover:border-[#4C00B0] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px] text-[#6E6A77]">
                      <span>{event.categoryLabel}</span>
                      {event.badge && (
                        <span className="font-mono font-semibold text-[#4C00B0]">
                          {event.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1.5 text-sm font-semibold text-[#141318] group-hover:text-[#4C00B0] transition-colors">
                      {event.title}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs font-medium text-[#5E5B66] group-hover:text-[#4C00B0]">
                    <span>Buka di TikTok</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. Closing Note */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <p className="font-display text-xl sm:text-3xl font-bold text-[#141318] leading-snug">
            Website ini akan terus diperbarui seiring berkembangnya Satoru Community!
          </p>
          <p className="mt-4 text-sm sm:text-base text-[#5E5B66]">
            Follow akun{' '}
            <a
              href={OFFICIAL_LINKS.tiktokOfficial}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#4C00B0] hover:underline"
            >
              @SatoruClanOfc
            </a>{' '}
            dan{' '}
            <a
              href={OFFICIAL_LINKS.tiktokFounder}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#4C00B0] hover:underline"
            >
              @KeanoPreset
            </a>{' '}
            agar kami tetap semangat untuk memperbarui website ini. Terima kasih!
          </p>
        </div>
      </section>
    </div>
  );
}
