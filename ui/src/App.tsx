import { useState } from 'react';
import type { PageRoute } from './types/app';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import { ThemeTransitionOverlay } from './components/transitions/ThemeTransitionOverlay';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { GamesPage } from './pages/GamesPage';
import { MinigamePage } from './pages/MinigamePage';
import { CommunityPage } from './pages/CommunityPage';
import { BrandPage } from './pages/BrandPage';

function AppShell() {
  const [activePage, setActivePage] = useState<PageRoute>('games');
  const { theme } = useTheme();

  return (
    <div
      className={`relative min-h-screen w-full transition-colors duration-300 ${
        theme === 'shine'
          ? 'bg-[#FFFDF6] text-[#16100C]'
          : 'bg-[#0A080D] text-[#F9F5F0]'
      }`}
    >
      <AmbientBackground />
      <ThemeTransitionOverlay />

      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        <Navbar activePage={activePage} onSelectPage={setActivePage} />

        <main className="flex-1">
          {activePage === 'games' && <GamesPage onNavigate={setActivePage} />}
          {activePage === 'arcade' && <MinigamePage />}
          {activePage === 'community' && <CommunityPage />}
          {activePage === 'brand' && <BrandPage />}
        </main>

        <Footer onSelectPage={setActivePage} />
      </div>
    </div>
  );
}

export function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
