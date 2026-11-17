import React, { useMemo, useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { OFFICIAL_LINKS, PARTNER_COMMUNITIES } from '../data/satoruData';
import { filterPartners } from '../utils/satoruLogic';
import { HeroBanner } from '../components/HeroBanner';

export function PartnershipPage() {
  const [query, setQuery] = useState('');

  const filteredPartners = useMemo(
    () => filterPartners(PARTNER_COMMUNITIES, query),
    [query]
  );

  return (
    <div>
      <HeroBanner
        title="PARTNERSHIP PAGE"
        variant="light"
        subtitle="Dan di sinilah Satoru bisa menaikkan nama komunitasnya — Satoru paling dikenal karena Intro dan Partnership-nya."
      />

      <section className="bg-[#F8F7F4] border-b border-[#E5E3DD]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#E5E3DD]">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141318]">
                Partnership Community
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#5E5B66] font-mono tabular-nums">
                Menampilkan {filteredPartners.length} dari {PARTNER_COMMUNITIES.length} komunitas partner
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <label htmlFor="partner-search" className="sr-only">
                Cari nama komunitas partner
              </label>
              <Search className="w-4 h-4 text-[#6E6A77] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="partner-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari komunitas partner..."
                className="w-full min-h-[44px] pl-9 pr-3 py-2 text-base sm:text-sm bg-white border border-[#D8D4CC] rounded-lg text-[#141318] placeholder:text-[#8A8594] focus:outline-none focus:border-[#4C00B0]"
              />
            </div>
          </div>

          {filteredPartners.length === 0 ? (
            <div className="mt-8 p-8 sm:p-10 text-center bg-white border border-[#E5E3DD] rounded-xl">
              <p className="text-sm font-medium text-[#141318]">
                Tidak ada partner yang cocok dengan &ldquo;{query}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-3 min-h-[44px] px-4 py-2 text-xs font-semibold rounded-md bg-[#141318] text-white cursor-pointer"
              >
                Tampilkan Semua Partner
              </button>
            </div>
          ) : (
            <ol className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
              {filteredPartners.map((partner) => (
                <li
                  key={`${partner.index}-${partner.name}`}
                  className="flex items-center gap-3.5 px-4 py-3.5 rounded-lg bg-white border border-[#E5E3DD]"
                >
                  <span className="font-mono text-xs font-semibold text-[#8A8594] tabular-nums w-6 shrink-0">
                    {String(partner.index).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-semibold text-[#141318] truncate">
                    {partner.name}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* Official Partnership Notes */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD]">
              <p className="text-xs font-mono text-[#6E6A77]">Note 01</p>
              <h3 className="mt-1 text-lg font-bold text-[#141318]">Tujuan Partnership</h3>
              <p className="mt-2.5 text-sm text-[#43404B] leading-relaxed">
                Partnership antar komunitas ditujukan untuk menjalin hubungan baik antara komunitas, memperluas komunikasi antar sesama member ke member komunitas lainnya, serta memperluas peluang kolaborasi seperti MEP, Collab Style, dan Collaboration Intro.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD] flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono text-[#6E6A77]">Note 02</p>
                <h3 className="mt-1 text-lg font-bold text-[#141318]">Pengajuan Partnership</h3>
                <p className="mt-2.5 text-sm text-[#43404B] leading-relaxed">
                  Kalau ingin mengajukan Partnership terhadap komunitas Satoru, silakan DM langsung TikTok Satoru{' '}
                  <strong className="font-semibold text-[#141318]">@SatoruClanOfc</strong>.
                </p>
                <p className="mt-3 text-xs text-[#6E6A77]">
                  Catatan: mungkin beberapa komunitas di atas sudah menghapus partnership-nya kepada Satoru tanpa pengetahuan admin kami.
                </p>
              </div>
              <a
                href={OFFICIAL_LINKS.tiktokOfficial}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-[#141318] text-white hover:bg-[#2E2B36] transition-colors w-full sm:w-fit"
              >
                <span>DM TikTok @SatoruClanOfc</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
