import React from 'react';
import { Award, Calendar, Scale } from 'lucide-react';
import { SSA_CATEGORIES, SSA_SEASONS, type PageRoute } from '../data/satoruData';
import { HeroBanner } from '../components/HeroBanner';

interface AwardsPageProps {
  onNavigate: (page: PageRoute) => void;
}

export function AwardsPage({ onNavigate }: AwardsPageProps) {
  return (
    <div>
      <HeroBanner
        title="Awards"
        variant="light"
        subtitle="Satoru Semester Awards (SSA) — Penghargaan Karya & Dedikasi Member"
      />

      {/* Intro & Evolution from SMA to SSA */}
      <section className="bg-[#F8F7F4] border-b border-[#E5E3DD]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-6 text-center">
          <p className="text-[15px] sm:text-base text-[#27252E] leading-relaxed">
            Kalian tahu nggak sih kalau <strong className="font-semibold text-[#141318]">Satoru Community</strong> punya program yang terinspirasi dari Recording Academy (Grammy), yaitu{' '}
            <strong className="font-semibold text-[#141318]">Satoru Semester Awards (SSA)</strong>!
          </p>
          <p className="italic text-[#5E5B66]">
            Maksudnya apa tuh, dan cara kerjanya gimana?
          </p>
          <p className="text-[15px] sm:text-base text-[#27252E] leading-relaxed">
            <strong className="font-semibold text-[#141318]">GAMPANG!</strong> Sistemnya berdasarkan video dedikasi anggota dan menyesuaikan dengan kategori-kategori di Satoru Semester Awards.
          </p>

          <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E5E3DD] text-left space-y-4">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#141318]">
              Mengapa SMA Berubah Menjadi SSA?
            </h2>
            <p className="text-sm sm:text-[15px] text-[#43404B] leading-relaxed">
              Awalnya, <strong className="text-[#141318]">SSA</strong> (Satoru Semester Awards) dinamakan{' '}
              <strong className="text-[#141318]">SMA</strong> yang memiliki kepanjangan{' '}
              <strong className="text-[#141318]">Satoru Monthly Awards</strong>. Namun karena setiap bulan pengurus harus menelusuri lebih dari{' '}
              <strong className="text-[#141318] font-mono tabular-nums">2.000 video</strong>, kami memutuskan untuk membuatnya menjadi per-semester sekolah, yaitu{' '}
              <strong className="text-[#141318]">6 bulan sekali</strong>.
            </p>
            <p className="text-sm sm:text-[15px] text-[#43404B] leading-relaxed">
              SMA sempat berjalan satu kali (Pemenang Perdana SMA) sebelum digantikan menjadi SSA agar pengurus Satoru Community dapat menyeimbangkan kesibukan dan menjaga penilaian tetap teliti dan berkualitas.
            </p>
          </div>
        </div>
      </section>

      {/* Jury & Dedication Rules */}
      <section className="bg-white border-b border-[#E5E3DD]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141318]">
              Sistem Penilaian &amp; Dewan Juri
            </h2>
            <div className="mx-auto mt-3 h-[2px] w-14 bg-[#B5945B]" aria-hidden="true" />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD]">
              <Scale className="w-5 h-5 text-[#4C00B0]" aria-hidden="true" />
              <h3 className="mt-3 text-base font-bold text-[#141318]">01. Penelusuran Juri</h3>
              <p className="mt-2 text-sm text-[#43404B] leading-relaxed">
                Juri memiliki tugas wajib mencari nominees paling berkualitas di setiap kategori melalui hashtag dedikasi resmi TikTok{' '}
                <strong className="font-mono text-[#141318]">#SatoruClan</strong>.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD]">
              <Award className="w-5 h-5 text-[#4C00B0]" aria-hidden="true" />
              <h3 className="mt-3 text-base font-bold text-[#141318]">02. Diskusi &amp; Kerahasiaan</h3>
              <p className="mt-2 text-sm text-[#43404B] leading-relaxed">
                Setelah menentukan nominees, dewan juri berdiskusi untuk memilih pemenang dan dilarang membocorkan hasil sebelum pengumuman resmi akun Satoru Community.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD]">
              <Calendar className="w-5 h-5 text-[#4C00B0]" aria-hidden="true" />
              <h3 className="mt-3 text-base font-bold text-[#141318]">03. Syarat Mutlak Dedikasi</h3>
              <p className="mt-2 text-sm text-[#43404B] leading-relaxed">
                Walaupun editan seorang anggota sangat bagus, jika tidak memakai hashtag{' '}
                <strong className="font-mono text-[#141318]">#SatoruClan</strong>, maka karya tidak dapat masuk nominasi maupun menang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 SSA Categories */}
      <section className="bg-[#F8F7F4] border-b border-[#E5E3DD]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141318]">
              Kategori SSA (8 Kategori)
            </h2>
            <p className="mt-2 text-sm text-[#5E5B66]">
              Terbagi dari 3 Kategori Utama dan 5 Kategori Karya Editing lainnya.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {SSA_CATEGORIES.map((cat) => (
              <div
                key={cat.number}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[#E5E3DD]"
              >
                <span className="font-mono text-sm font-bold text-[#4C00B0] tabular-nums shrink-0 mt-0.5">
                  0{cat.number}
                </span>
                <div>
                  <p className="text-xs text-[#6E6A77]">{cat.group}</p>
                  <h3 className="mt-0.5 text-sm sm:text-base font-bold text-[#141318]">
                    {cat.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Season Schedule */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141318]">
                Waktu Pelaksanaan SSA
              </h2>
              <p className="mt-2 text-sm text-[#5E5B66]">
                SSA menggunakan sistem Season dua kali dalam setahun.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('hall-of-fame')}
              className="min-h-[44px] px-4 py-2 text-xs font-semibold rounded-md bg-[#141318] text-white hover:bg-[#2E2B36] transition-colors w-full sm:w-fit cursor-pointer"
            >
              Lihat Pemenang di Hall Of Fame
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SSA_SEASONS.map((season) => (
              <div
                key={season.season}
                className="p-6 sm:p-7 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD]"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#6E6A77]">
                  <span>{season.season}</span>
                  <span>{season.period}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 py-4 border-y border-[#E5E3DD]">
                  <div>
                    <p className="text-xs text-[#6E6A77]">Pengumuman Nominasi</p>
                    <p className="mt-1 text-base font-bold text-[#141318] font-mono tabular-nums">
                      {season.nominationDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6E6A77]">Pengumuman Pemenang</p>
                    <p className="mt-1 text-base font-bold text-[#4C00B0] font-mono tabular-nums">
                      {season.winnerDate}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#43404B] leading-relaxed">
                  {season.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
