import { useState } from 'react';
import { motion } from 'motion/react';
import type { PageRoute } from '../../types/app';
import { useTheme } from '../../context/ThemeContext';
import { useI18n } from '../../context/I18nContext';
import { BrandLogo } from '../layout/BrandLogo';
import { BioIcon, type BioIconName } from '../ui/BioIcon';

interface HeroSectionProps {
  onNavigate: (page: PageRoute) => void;
  onScrollToGames: () => void;
}

const ORBIT_ICONS_SHINE: {
  name: BioIconName;
  className: string;
  delay: number;
  size: number;
}[] = [
  { name: 'shine-gamepad', className: '-top-6 left-4', delay: 0, size: 56 },
  { name: 'shine-mallet', className: '-top-4 right-6', delay: 0.5, size: 58 },
  { name: 'shine-topo', className: 'bottom-6 -left-2', delay: 1.0, size: 56 },
  { name: 'shine-trophy', className: 'bottom-4 right-4', delay: 1.4, size: 52 },
];

const ORBIT_ICONS_SHADY: {
  name: BioIconName;
  className: string;
  delay: number;
  size: number;
}[] = [
  { name: 'shady-gamepad', className: '-top-6 left-4', delay: 0, size: 56 },
  { name: 'shady-skull-bomb', className: '-top-4 right-6', delay: 0.4, size: 58 },
  { name: 'shady-topo', className: 'bottom-6 -left-2', delay: 0.9, size: 58 },
  { name: 'shady-bat', className: 'bottom-4 right-4', delay: 1.3, size: 54 },
];

export function HeroSection({ onNavigate, onScrollToGames }: HeroSectionProps) {
  const { theme, triggerThemeToggle } = useTheme();
  const { t, tv } = useI18n();
  const [showIntroVideo, setShowIntroVideo] = useState(false);

  const orbitIcons = theme === 'shine' ? ORBIT_ICONS_SHINE : ORBIT_ICONS_SHADY;

  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-8 lg:pt-20 lg:pb-28">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left Column: Open Editorial Typography & CTAs */}
        <div className="space-y-7 text-left lg:col-span-7">
          <motion.div
            key={`badge-${theme}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            className={`inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-black tracking-wide sm:text-sm ${
              theme === 'shine'
                ? 'bg-amber-200/80 text-[#16100C]'
                : 'border border-orange-500/40 bg-orange-950/50 text-orange-300'
            }`}
          >
            <BioIcon
              name={theme === 'shine' ? 'shine-topo' : 'shady-topo'}
              size={28}
            />
            <span>{tv('hero_badge', theme)}</span>
          </motion.div>

          <motion.h1
            key={`title-${theme}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 24 }}
            className={`text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl ${
              theme === 'shine'
                ? 'text-[#16100C]'
                : 'bg-gradient-to-r from-white via-orange-200 to-orange-500 bg-clip-text text-transparent'
            }`}
          >
            {tv('hero_title', theme)}
          </motion.h1>

          <motion.p
            key={`sub-${theme}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`max-w-2xl text-base font-medium leading-relaxed sm:text-xl ${
              theme === 'shine' ? 'text-[#5C4738]' : 'text-zinc-300'
            }`}
          >
            {tv('hero_sub', theme)}
          </motion.p>

          {/* Clean Action Bar with Strictly Theme-Matched Shiny vs Shady Icons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <motion.button
              type="button"
              onClick={onScrollToGames}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`flex cursor-pointer items-center gap-2.5 rounded-full px-7 py-4 text-sm font-black sm:text-base ${
                theme === 'shine'
                  ? 'bg-[#16100C] text-amber-300 shadow-lg hover:bg-zinc-900'
                  : 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-[0_0_28px_rgba(255,85,0,0.45)]'
              }`}
            >
              <BioIcon
                name={theme === 'shine' ? 'shine-gamepad' : 'shady-gamepad'}
                size={28}
              />
              <span>{tv('hero_cta_games', theme)}</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => onNavigate('arcade')}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`flex cursor-pointer items-center gap-2.5 rounded-full px-6 py-4 text-sm font-black sm:text-base ${
                theme === 'shine'
                  ? 'border-2 border-[#16100C]/20 bg-white/80 text-[#16100C] hover:border-[#16100C]'
                  : 'border border-zinc-700 bg-zinc-900/70 text-orange-300 hover:border-orange-500'
              }`}
            >
              <BioIcon
                name={theme === 'shine' ? 'shine-arcade-pad' : 'shady-skull-bomb'}
                size={26}
              />
              <span>{tv('hero_cta_arcade', theme)}</span>
            </motion.button>

            <button
              type="button"
              onClick={() => setShowIntroVideo((prev) => !prev)}
              className={`cursor-pointer px-3 py-2 text-xs font-extrabold underline-offset-4 hover:underline sm:text-sm ${
                theme === 'shine' ? 'text-[#5C4738]' : 'text-amber-400'
              }`}
            >
              {t('hero_watch_video')}
            </button>
          </div>
        </div>

        {/* Right Column: Floating Transparent Logo + Theme-Divided Orbiting Icons */}
        <div className="relative flex flex-col items-center justify-center lg:col-span-5">
          <div
            className={`pointer-events-none absolute h-72 w-72 rounded-full blur-3xl ${
              theme === 'shine' ? 'bg-amber-400/35' : 'bg-orange-600/25'
            }`}
          />

          <div className="relative w-full max-w-md py-6">
            {orbitIcons.map((item) => (
              <motion.div
                key={item.name}
                animate={{
                  y: [0, -12, 0],
                  rotate: [-6, 8, -6],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: 'easeInOut',
                }}
                className={`pointer-events-none absolute z-20 ${item.className}`}
              >
                <BioIcon
                  name={item.name}
                  size={item.size}
                  className="drop-shadow-[0_8px_14px_rgba(0,0,0,0.3)]"
                />
              </motion.div>
            ))}

            <motion.div
              animate={
                theme === 'shine'
                  ? { y: [0, -12, 0], rotate: [-1, 1.5, -1] }
                  : { y: [0, -8, 0] }
              }
              transition={{
                duration: theme === 'shine' ? 3.5 : 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                triggerThemeToggle(
                  rect.left + rect.width / 2,
                  rect.top + rect.height / 2
                );
              }}
              className="group relative z-10 cursor-pointer"
            >
              <BrandLogo className="mx-auto max-h-80 w-full transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_16px_28px_rgba(0,0,0,0.38)]" />
              <p
                className={`mt-4 text-center text-xs font-extrabold uppercase tracking-widest opacity-75 transition-opacity group-hover:opacity-100 ${
                  theme === 'shine' ? 'text-[#5C4738]' : 'text-orange-400'
                }`}
              >
                {theme === 'shine'
                  ? 'Click logo to drip into Shady Fun'
                  : 'Click logo to shine into Shine Fun'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {showIntroVideo && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 overflow-hidden rounded-3xl bg-black/95 p-4 shadow-2xl"
        >
          <div className="mb-3 flex items-center justify-between px-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              Bioanim Games — Official Brand Intro
            </span>
            <button
              type="button"
              onClick={() => setShowIntroVideo(false)}
              className="cursor-pointer rounded-full bg-zinc-800 px-3 py-1 text-xs font-bold text-white hover:bg-zinc-700"
            >
              Close
            </button>
          </div>
          <video
            src="/assets/brand/logo-inicio-1.mp4"
            controls
            autoPlay
            className="mx-auto max-h-[420px] w-full rounded-2xl object-contain"
          />
        </motion.div>
      )}
    </section>
  );
}
