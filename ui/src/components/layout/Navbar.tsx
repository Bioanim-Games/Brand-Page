import { motion } from 'motion/react';
import type { LocaleCode, PageRoute } from '../../types/app';
import { useTheme } from '../../context/ThemeContext';
import { useI18n } from '../../context/I18nContext';
import { BrandLogo } from './BrandLogo';
import { BioIcon, type BioIconName } from '../ui/BioIcon';

interface NavbarProps {
  activePage: PageRoute;
  onSelectPage: (page: PageRoute) => void;
}

export function Navbar({ activePage, onSelectPage }: NavbarProps) {
  const {
    theme,
    shineWaveMode,
    setShineWaveMode,
    triggerThemeToggle,
    isTransitioning,
  } = useTheme();
  const { locale, setLocale, supportedLocales, t } = useI18n();

  // Strictly use Shiny icons in Shine mode and Shady icons in Shady mode
  const navItems: { id: PageRoute; label: string; icon: BioIconName }[] = [
    {
      id: 'games',
      label: t('nav_games'),
      icon: theme === 'shine' ? 'shine-gamepad' : 'shady-gamepad',
    },
    {
      id: 'arcade',
      label: t('nav_arcade'),
      icon: theme === 'shine' ? 'shine-arcade-pad' : 'shady-skull-bomb',
    },
    {
      id: 'community',
      label: t('nav_community'),
      icon: theme === 'shine' ? 'shine-heart' : 'shady-demon-heart',
    },
    {
      id: 'brand',
      label: t('nav_brand'),
      icon: theme === 'shine' ? 'shine-topo' : 'shady-topo',
    },
  ];

  const handleVibeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    triggerThemeToggle(centerX, centerY);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md">
      <div
        className={`mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 transition-colors duration-300 sm:px-8 ${
          theme === 'shine'
            ? 'border-b border-[#16100C]/15 bg-[#FFFDF6]/85'
            : 'border-b border-orange-500/20 bg-[#0A080D]/85'
        }`}
      >
        {/* Brand Logo + Title */}
        <motion.button
          type="button"
          onClick={() => onSelectPage('games')}
          whileHover={
            theme === 'shine'
              ? { scale: 1.04, rotate: -1.5 }
              : { scale: 1.04, x: [0, -2, 2, 0] }
          }
          whileTap={{ scale: 0.96 }}
          className="flex cursor-pointer items-center gap-3 text-left"
        >
          <BrandLogo className="h-12 w-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] sm:h-14" />
          <div className="hidden sm:block">
            <span
              className={`block text-lg font-black tracking-tight ${
                theme === 'shine' ? 'text-[#16100C]' : 'text-orange-400'
              }`}
            >
              BIOANIM GAMES
            </span>
            <span
              className={`block text-[11px] font-extrabold uppercase tracking-widest ${
                theme === 'shine' ? 'text-amber-700' : 'text-zinc-400'
              }`}
            >
              {theme === 'shine' ? 'Shine Fun Studio' : 'Shady Fun Underground'}
            </span>
          </div>
        </motion.button>

        {/* 4 Navigation Tabs with Theme-Divided Shiny / Shady Icons */}
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => onSelectPage(item.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-2 text-xs font-extrabold transition-all sm:px-4 sm:text-sm ${
                  theme === 'shine'
                    ? isActive
                      ? 'bg-[#16100C] text-amber-300 shadow-sm'
                      : 'text-[#3B2A1E] hover:bg-amber-200/60'
                    : isActive
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-[0_0_16px_rgba(255,85,0,0.45)]'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-orange-300'
                }`}
              >
                <BioIcon name={item.icon} size={24} />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Right Controls: 9-Language Selector + Wave Mode Tester + Shine/Shady Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <label className="relative flex items-center">
            <span className="sr-only">Language</span>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as LocaleCode)}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-extrabold outline-none transition-all ${
                theme === 'shine'
                  ? 'border border-[#16100C]/20 bg-white/90 text-[#16100C] hover:border-[#16100C]'
                  : 'border border-zinc-800 bg-zinc-900/90 text-zinc-100 hover:border-orange-500/50'
              }`}
            >
              {supportedLocales.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.flag} {item.label}
                </option>
              ))}
            </select>
          </label>

          {/* Wave Mode Selector (Circle vs Line, Zero Small Emojis) */}
          <div
            className={`flex items-center rounded-full p-0.5 text-[11px] font-bold ${
              theme === 'shine'
                ? 'border border-[#16100C]/20 bg-amber-100/70 text-[#16100C]'
                : 'border border-zinc-800 bg-zinc-900 text-zinc-300'
            }`}
            title="Switch between Circle Portal and Vertical Laser Line for Shady -> Shine transition"
          >
            <button
              type="button"
              onClick={() => setShineWaveMode('circle')}
              className={`cursor-pointer rounded-full px-2.5 py-1 transition-all ${
                shineWaveMode === 'circle'
                  ? theme === 'shine'
                    ? 'bg-[#16100C] text-amber-300'
                    : 'bg-orange-600 text-white'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {t('wave_circle')}
            </button>
            <button
              type="button"
              onClick={() => setShineWaveMode('line')}
              className={`cursor-pointer rounded-full px-2.5 py-1 transition-all ${
                shineWaveMode === 'line'
                  ? theme === 'shine'
                    ? 'bg-[#16100C] text-amber-300'
                    : 'bg-orange-600 text-white'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {t('wave_line')}
            </button>
          </div>

          {/* Primary Shine Fun <-> Shady Fun Theme Switcher */}
          <motion.button
            type="button"
            disabled={isTransitioning}
            onClick={handleVibeClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wide transition-all sm:text-sm ${
              theme === 'shine'
                ? 'bg-[#16100C] text-amber-300 shadow-md hover:bg-zinc-900'
                : 'bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 text-[#16100C] shadow-[0_0_20px_rgba(251,191,36,0.55)]'
            }`}
          >
            <BioIcon
              name={theme === 'shine' ? 'shady-topo' : 'shine-topo'}
              size={24}
            />
            <span>
              {theme === 'shine'
                ? t('vibe_shady_label')
                : t('vibe_shine_label')}
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
