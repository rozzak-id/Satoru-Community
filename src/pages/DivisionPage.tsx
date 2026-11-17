import React from 'react';
import { CheckCircle2, Clock, ExternalLink, Users } from 'lucide-react';
import { DIVISIONS, OFFICIAL_LINKS, SITE_ASSETS } from '../data/satoruData';
import { HeroBanner } from '../components/HeroBanner';

export function DivisionPage() {
  return (
    <div>
      <HeroBanner
        title="Division"
        subtitle="Cabang & Divisi Resmi Satoru Community"
        backgroundImage={SITE_ASSETS.heroDivision}
      />

      <section className="bg-white border-b border-[#E5E3DD]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-center text-sm sm:text-lg text-[#27252E] max-w-2xl mx-auto leading-relaxed">
            Mungkin kalian tidak tahu kalau <strong className="font-semibold text-[#141318]">Satoru Community</strong> memiliki beberapa <strong className="font-semibold text-[#141318]">divisi</strong> atau cabang-cabang lain, seperti:
          </p>

          <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
            {DIVISIONS.map((div, idx) => (
              <article
                key={div.id}
                className="grid grid-cols-1 md:grid-cols-12 items-stretch rounded-xl bg-[#F8F7F4] border border-[#E5E3DD] overflow-hidden"
              >
                <div className="md:col-span-5 aspect-video md:aspect-auto md:min-h-[215px] bg-[#141318] overflow-hidden">
                  <img
                    src={div.image}
                    alt={`Logo resmi divisi ${div.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:col-span-7 p-5 sm:p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                    <span className="font-mono text-xs text-[#6E6A77] tabular-nums">
                      Divisi 0{idx + 1}
                    </span>

                    {div.status === 'active' && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#166534]">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{div.statusLabel}</span>
                      </span>
                    )}
                    {div.status === 'paused' && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#92400E]">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{div.statusLabel}</span>
                      </span>
                    )}
                    {div.status === 'developing' && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4C00B0]">
                        <Users className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{div.statusLabel}</span>
                      </span>
                    )}
                  </div>

                  <h2 className="mt-2 font-display text-xl sm:text-3xl font-bold text-[#141318]">
                    {div.name}
                  </h2>

                  <p className="mt-2.5 sm:mt-3 text-sm sm:text-[15px] text-[#43404B] leading-relaxed">
                    {div.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F7F4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 text-center">
          <p className="text-sm sm:text-base text-[#27252E] leading-relaxed">
            Masing-masing divisi ini memiliki target dan tujuan yang berbeda persis seperti yang dijelaskan. Divisi yang belum berjalan (mangkrak) akan secepatnya dikembangkan kembali. Jika ada yang berminat membantu menjadi pengurus, silakan DM TikTok{' '}
            <strong className="font-semibold text-[#141318]">@SatoruClanOfc</strong>.
          </p>
          <a
            href={OFFICIAL_LINKS.tiktokOfficial}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-[#141318] text-white hover:bg-[#2E2B36] transition-colors"
          >
            <span>Hubungi @SatoruClanOfc di TikTok</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
