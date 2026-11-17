import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { PageRoute } from '../data/satoruData';
import { HollowStarMark } from './SatoruEmblems';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

const NAV_ITEMS: Array<{ page: PageRoute; label: string }> = [
  { page: 'main-page', label: 'Main Page' },
  { page: 'partnership', label: 'Partnership' },
  { page: 'division', label: 'Division' },
  { page: 'awards', label: 'Awards' },
  { page: 'hall-of-fame', label: 'Hall Of Fame' },
  { page: 'admins', label: 'Admins' },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, page: PageRoute) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070709] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Single-line Brand Wordmark + Uploaded Hollow Star SVG */}
        <a
          href="/main-page"
          onClick={(e) => handleLinkClick(e, 'main-page')}
          className="flex items-center gap-2.5 text-sm sm:text-base font-semibold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A78BFA] rounded-sm"
        >
          <HollowStarMark className="w-6 h-6 text-white shrink-0" />
          <span>Satoru Community</span>
        </a>

        {/* Zone 2: Concise single-line desktop nav links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Navigasi Utama">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <a
                key={item.page}
                href={`/${item.page}`}
                onClick={(e) => handleLinkClick(e, item.page)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-[13px] lg:text-sm whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A78BFA] ${
                  isActive
                    ? 'text-white font-semibold border-[#B5945B]'
                    : 'text-neutral-300 font-medium border-transparent hover:text-white hover:border-white/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA Action + Mobile Hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('join-satoru-now');
            }}
            className={`hidden md:inline-flex items-center justify-center px-3.5 lg:px-4 py-2 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A78BFA] ${
              currentPage === 'join-satoru-now'
                ? 'bg-[#B5945B] text-[#070709]'
                : 'bg-[#5B00D6] hover:bg-[#6E18E6] text-white'
            }`}
          >
            Join Satoru Now!
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md text-neutral-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi Mobile"
          className="md:hidden bg-[#0E0E12] border-t border-white/10 px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <a
                key={item.page}
                href={`/${item.page}`}
                onClick={(e) => handleLinkClick(e, item.page)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center min-h-[44px] px-3.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold border-l-2 border-[#B5945B]'
                    : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-2 pb-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('join-satoru-now');
              }}
              className="w-full min-h-[44px] px-4 py-2.5 text-sm font-semibold rounded-md bg-[#5B00D6] hover:bg-[#6E18E6] text-white transition-colors cursor-pointer"
            >
              Join Satoru Now!
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
