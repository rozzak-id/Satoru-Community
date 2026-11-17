import React from 'react';
import { ExternalLink } from 'lucide-react';
import { OFFICIAL_LINKS, type PageRoute } from '../data/satoruData';
import { HollowStarMark } from './SatoruEmblems';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (e: React.MouseEvent, page: PageRoute) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="bg-[#070709] text-neutral-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pb-8 sm:pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 text-white font-semibold text-base">
              <HollowStarMark className="w-5 h-5 text-white shrink-0" />
              <span>Satoru Community</span>
            </div>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-sm">
              Komunitas editing yang berdiri sejak 13 Januari 2025 oleh @KeanoPreset. Terbuka untuk semua style dan semua software editing.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white mb-3">Halaman</h2>
            <ul className="grid grid-cols-2 gap-y-1 sm:gap-y-2 gap-x-4 text-sm">
              <li>
                <a
                  href="/main-page"
                  onClick={(e) => handleNav(e, 'main-page')}
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 hover:text-white transition-colors"
                >
                  Main Page
                </a>
              </li>
              <li>
                <a
                  href="/partnership"
                  onClick={(e) => handleNav(e, 'partnership')}
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 hover:text-white transition-colors"
                >
                  Partnership
                </a>
              </li>
              <li>
                <a
                  href="/division"
                  onClick={(e) => handleNav(e, 'division')}
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 hover:text-white transition-colors"
                >
                  Division
                </a>
              </li>
              <li>
                <a
                  href="/awards"
                  onClick={(e) => handleNav(e, 'awards')}
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 hover:text-white transition-colors"
                >
                  Awards
                </a>
              </li>
              <li>
                <a
                  href="/hall-of-fame"
                  onClick={(e) => handleNav(e, 'hall-of-fame')}
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 hover:text-white transition-colors"
                >
                  Hall Of Fame
                </a>
              </li>
              <li>
                <a
                  href="/admins"
                  onClick={(e) => handleNav(e, 'admins')}
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 hover:text-white transition-colors"
                >
                  Admins
                </a>
              </li>
              <li className="col-span-2">
                <a
                  href="/join-satoru-now"
                  onClick={(e) => handleNav(e, 'join-satoru-now')}
                  className="inline-flex items-center min-h-[36px] sm:min-h-0 text-[#D8B878] hover:text-white transition-colors"
                >
                  Join Satoru Now!
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white mb-3">Akun Resmi &amp; Seleksi</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={OFFICIAL_LINKS.tiktokOfficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[36px] sm:min-h-0 hover:text-white transition-colors"
                >
                  <span>TikTok @SatoruClanOfc</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_LINKS.tiktokFounder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[36px] sm:min-h-0 hover:text-white transition-colors"
                >
                  <span>Founder @KeanoPreset</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_LINKS.instagramOfficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[36px] sm:min-h-0 hover:text-white transition-colors"
                >
                  <span>Instagram @SatoruClanOfc</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_LINKS.whatsappSelectionGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[36px] sm:min-h-0 text-[#D8B878] hover:text-white transition-colors"
                >
                  <span>Grup Seleksi WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
          <p>
            Website ini akan terus diperbarui seiring berkembangnya Satoru Community.
          </p>
          <p className="font-mono tabular-nums text-neutral-500">Est. 13 Januari 2025 · @SatoruClanOfc</p>
        </div>

        {/* Very bottom attribution line as requested */}
        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <p className="text-xs font-medium text-neutral-400">
            Website rebuilt by{' '}
            <span className="font-mono font-semibold text-white">@rozzak.id</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
