import { useState } from 'react';
import { motion } from 'motion/react';
import type { GameCatalogItem } from '../../types/app';
import { useTheme } from '../../context/ThemeContext';
import { useI18n } from '../../context/I18nContext';
import { BioIcon, type BioIconName } from '../ui/BioIcon';

interface GameShowcaseProps {
  game: GameCatalogItem;
}

export function GameShowcaseCard({ game }: GameShowcaseProps) {
  const { theme } = useTheme();
  const { locale, setLocale, supportedLocales, t, tv } = useI18n();
  const [shakeCount, setShakeCount] = useState(0);

  if (game.id === 'topo-smash') {
    const highlightIcons: BioIconName[] =
      theme === 'shine'
        ? ['shine-mallet', 'shine-arcade-pad', 'shine-hardhat']
        : ['shady-bat', 'shady-fist', 'shady-topo'];

    return (
      <div className="grid grid-cols-1 items-center gap-12 py-8 lg:grid-cols-12">
        {/* Left 7 Columns: Pure Open Plain Space Typography & 9-Language Matrix */}
        <div className="space-y-6 text-left lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider ${
                theme === 'shine'
                  ? 'bg-amber-300/90 text-[#16100C]'
                  : 'border border-orange-500/50 bg-orange-950/60 text-orange-300'
              }`}
            >
              <BioIcon
                name={theme === 'shine' ? 'shine-pickaxe' : 'shady-beartrap'}
                size={22}
              />
              <span>{t('status_in_dev')}</span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider opacity-65">
              {game.engineBadge}
            </span>
          </div>

          <div>
            <h3
              className={`text-4xl font-black tracking-tight sm:text-5xl ${
                theme === 'shine' ? 'text-[#16100C]' : 'text-white'
              }`}
            >
              {game.title}
            </h3>
            <p
              className={`mt-1.5 text-base font-extrabold sm:text-lg ${
                theme === 'shine' ? 'text-amber-700' : 'text-orange-400'
              }`}
            >
              {t(game.subtitleKey)}
            </p>
          </div>

          <p
            className={`max-w-2xl text-base font-medium leading-relaxed sm:text-lg ${
              theme === 'shine' ? 'text-[#4A3728]' : 'text-zinc-300'
            }`}
          >
            {theme === 'shine'
              ? t(game.shineSummaryKey)
              : t(game.shadySummaryKey)}
          </p>

          {/* Theme-Divided Feature Highlights */}
          <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
            {game.highlightsKeys.map((hk, idx) => (
              <div
                key={hk}
                className="flex items-center gap-2.5 text-xs font-extrabold sm:text-sm"
              >
                <BioIcon
                  name={highlightIcons[idx % highlightIcons.length]}
                  size={30}
                />
                <span>{t(hk)}</span>
              </div>
            ))}
          </div>

          {/* Minimal Open Progress Line */}
          <div className="max-w-md pt-2">
            <div className="mb-1.5 flex justify-between text-xs font-black uppercase tracking-wider opacity-80">
              <span>{t('progress_label')}</span>
              <span>{game.progressPercent}%</span>
            </div>
            <div
              className={`h-2.5 w-full overflow-hidden rounded-full ${
                theme === 'shine' ? 'bg-amber-200' : 'bg-zinc-800'
              }`}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${game.progressPercent}%` }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-lime-500"
              />
            </div>
          </div>

          {/* 9 Supported Languages Floating Directly on Open Canvas */}
          {game.supportedLocales && (
            <div className="space-y-3 pt-3">
              <p className="text-xs font-black uppercase tracking-wider opacity-75">
                {t('languages_supported_title')}
              </p>
              <div className="flex flex-wrap gap-2">
                {supportedLocales
                  .filter((loc) => game.supportedLocales?.includes(loc.code))
                  .map((loc) => {
                    const active = locale === loc.code;
                    return (
                      <button
                        key={loc.code}
                        type="button"
                        onClick={() => setLocale(loc.code)}
                        className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all ${
                          active
                            ? theme === 'shine'
                              ? 'bg-[#16100C] text-amber-300 shadow-sm'
                              : 'bg-orange-600 text-white shadow-[0_0_14px_rgba(255,85,0,0.45)]'
                            : theme === 'shine'
                              ? 'bg-amber-100/80 text-[#3B2A1E] hover:bg-amber-200'
                              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                        }`}
                      >
                        {loc.flag} {loc.label}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Right 5 Columns: Single Sleek Classified Vault Accent Panel */}
        <div className="lg:col-span-5">
          <motion.div
            whileHover={{ y: -4 }}
            className={`relative overflow-hidden rounded-3xl p-8 text-left ${
              theme === 'shine'
                ? 'bg-gradient-to-br from-amber-100/90 via-amber-50 to-orange-100/80 text-[#16100C] shadow-xl'
                : 'border border-orange-500/30 bg-gradient-to-br from-[#16111D] via-[#0F0C14] to-[#1D110C] text-zinc-100 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
            }`}
          >
            <div className="flex items-center justify-between pb-6">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-500">
                <span className="h-2 w-2 animate-ping rounded-full bg-orange-500" />
                {t('no_spoiler_badge')}
              </span>
            </div>

            <div className="my-4 flex items-center justify-center gap-6 py-4">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-6, 6, -6] }}
                transition={{ duration: 2.8, repeat: Infinity }}
              >
                <BioIcon
                  name={theme === 'shine' ? 'shine-topo' : 'shady-topo'}
                  size={84}
                />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.07, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                <BioIcon
                  name={theme === 'shine' ? 'shine-chest' : 'shady-cage'}
                  size={88}
                />
              </motion.div>
              <motion.div
                animate={{ rotate: [-12, 14, -12] }}
                transition={{ duration: 2.0, repeat: Infinity }}
              >
                <BioIcon
                  name={theme === 'shine' ? 'shine-mallet' : 'shady-bat'}
                  size={80}
                />
              </motion.div>
            </div>

            <p className="mt-4 text-center text-sm font-bold leading-relaxed opacity-90">
              {tv('no_spoiler_desc', theme)}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Low-Detail Concept & Mystery Pipeline Strip Item (Strictly Theme-Divided Icons)
  const isConcept = game.status === 'concept';

  return (
    <div className="flex flex-col justify-between gap-4 py-6 text-left sm:flex-row sm:items-center">
      <div className="flex items-start gap-5">
        <div className="flex shrink-0 items-center gap-2 pt-1">
          {isConcept ? (
            theme === 'shine' ? (
              <>
                <BioIcon name="shine-fire-helmet" size={52} />
                <BioIcon name="shine-axe" size={48} />
              </>
            ) : (
              <>
                <BioIcon name="shady-battle-axe" size={52} />
                <BioIcon name="shady-dynamite" size={48} />
              </>
            )
          ) : (
            <motion.button
              type="button"
              onClick={() => setShakeCount((c) => c + 1)}
              animate={
                shakeCount > 0 ? { rotate: [0, -8, 8, -5, 5, 0] } : {}
              }
              className="cursor-pointer"
              title="Click to rattle mystery vault"
            >
              <BioIcon
                name={theme === 'shine' ? 'shine-chest' : 'shady-cage'}
                size={56}
              />
            </motion.button>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h4
              className={`text-xl font-black tracking-tight ${
                theme === 'shine' ? 'text-[#16100C]' : 'text-white'
              }`}
            >
              {game.status === 'mystery' ? t('mystery_title') : game.title}
            </h4>
            <span
              className={`rounded-full px-3 py-0.5 text-[11px] font-black uppercase ${
                theme === 'shine'
                  ? 'bg-amber-200/80 text-[#16100C]'
                  : 'bg-zinc-800 text-orange-300'
              }`}
            >
              {isConcept ? t('status_concept') : t('status_mystery')}
            </span>
          </div>

          <p
            className={`max-w-2xl text-sm font-medium leading-relaxed ${
              theme === 'shine' ? 'text-[#5C4738]' : 'text-zinc-400'
            }`}
          >
            {theme === 'shine'
              ? t(game.shineSummaryKey)
              : t(game.shadySummaryKey)}
          </p>

          {isConcept && game.workingTitleNoteKey && (
            <p
              className={`text-xs font-extrabold ${
                theme === 'shine' ? 'text-amber-800' : 'text-amber-400/90'
              }`}
            >
              {tv(game.workingTitleNoteKey, theme)}
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        {game.genres.map((g) => (
          <span
            key={g}
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              theme === 'shine'
                ? 'bg-amber-100/70 text-[#4A3728]'
                : 'bg-zinc-900 text-zinc-400'
            }`}
          >
            {g}
          </span>
        ))}
      </div>
    </div>
  );
}
