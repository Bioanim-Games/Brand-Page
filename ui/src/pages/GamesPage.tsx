import { useRef } from 'react';
import type { PageRoute } from '../types/app';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../context/I18nContext';
import { GAMES_CATALOG } from '../data/gamesData';
import { HeroSection } from '../components/games/HeroSection';
import { GameShowcaseCard } from '../components/games/GameShowcaseCard';

interface GamesPageProps {
  onNavigate: (page: PageRoute) => void;
}

export function GamesPage({ onNavigate }: GamesPageProps) {
  const { theme } = useTheme();
  const { tv } = useI18n();
  const catalogRef = useRef<HTMLDivElement | null>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const flagshipGame = GAMES_CATALOG[0];
  const pipelineGames = GAMES_CATALOG.slice(1);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Open Unboxed Hero Canvas */}
      <HeroSection onNavigate={onNavigate} onScrollToGames={scrollToCatalog} />

      {/* 2. Flagship In-Development Feature & Low-Detail Concept Pipeline in One Smooth Flow */}
      <section
        ref={catalogRef}
        className="mx-auto max-w-7xl px-4 sm:px-8"
      >
        <div className="mb-10 text-left">
          <h2
            className={`text-3xl font-black tracking-tight sm:text-5xl ${
              theme === 'shine' ? 'text-[#16100C]' : 'text-white'
            }`}
          >
            {tv('games_section_title', theme)}
          </h2>
          <p
            className={`mt-2 max-w-2xl text-base font-medium sm:text-lg ${
              theme === 'shine' ? 'text-[#5C4738]' : 'text-zinc-400'
            }`}
          >
            {tv('games_section_sub', theme)}
          </p>
        </div>

        {/* Open Editorial Split for Topo Smash */}
        {flagshipGame && <GameShowcaseCard game={flagshipGame} />}

        {/* Plain Breathing Space + Clean Divider Strip for Early Concepts (No Box Cards) */}
        <div
          className={`mt-16 border-t pt-12 ${
            theme === 'shine' ? 'border-[#16100C]/15' : 'border-zinc-800'
          }`}
        >
          <p className="mb-4 text-left text-xs font-black uppercase tracking-widest opacity-60">
            NEXT IN THE BIO-LAB PIPELINE (EARLY CONCEPTS • ART PROTECTED)
          </p>
          <div
            className={`divide-y ${
              theme === 'shine' ? 'divide-[#16100C]/10' : 'divide-zinc-800/80'
            }`}
          >
            {pipelineGames.map((game) => (
              <GameShowcaseCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
