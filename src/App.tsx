import React, { useEffect, useState } from 'react';
import type { PageRoute } from './data/satoruData';
import { normalizeRoute } from './utils/satoruLogic';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MainPage } from './pages/MainPage';
import { PartnershipPage } from './pages/PartnershipPage';
import { DivisionPage } from './pages/DivisionPage';
import { AwardsPage } from './pages/AwardsPage';
import { HallOfFamePage } from './pages/HallOfFamePage';
import { AdminsPage } from './pages/AdminsPage';
import { JoinPage } from './pages/JoinPage';

function getInitialPage(): PageRoute {
  if (typeof window === 'undefined') return 'main-page';
  const params = new URLSearchParams(window.location.search);
  const queryPage = params.get('page');
  if (queryPage) return normalizeRoute(queryPage);
  return normalizeRoute(window.location.pathname);
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialPage);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(normalizeRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: PageRoute) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      const targetPath = page === 'main-page' ? '/main-page' : `/${page}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page }, '', targetPath);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#141318]">
      <Navbar currentPage={currentPage} onNavigate={navigate} />

      <main className="flex-1">
        {currentPage === 'main-page' && <MainPage onNavigate={navigate} />}
        {currentPage === 'partnership' && <PartnershipPage />}
        {currentPage === 'division' && <DivisionPage />}
        {currentPage === 'awards' && <AwardsPage onNavigate={navigate} />}
        {currentPage === 'hall-of-fame' && <HallOfFamePage />}
        {currentPage === 'admins' && <AdminsPage onNavigate={navigate} />}
        {currentPage === 'join-satoru-now' && <JoinPage />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
