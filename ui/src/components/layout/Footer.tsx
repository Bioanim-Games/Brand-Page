import type { PageRoute } from '../../types/app';
import { useTheme } from '../../context/ThemeContext';
import { useI18n } from '../../context/I18nContext';
import { BrandLogo } from './BrandLogo';
import { BioIcon } from '../ui/BioIcon';

interface FooterProps {
  onSelectPage: (page: PageRoute) => void;
}

export function Footer({ onSelectPage }: FooterProps) {
  const { theme } = useTheme();
  const { t, locale } = useI18n();

  return (
    <footer
      className={`relative z-10 mt-16 border-t transition-colors duration-300 ${
        theme === 'shine'
          ? 'border-[#16100C]/15 bg-[#FFF9E6]/60 text-[#16100C]'
          : 'border-zinc-800 bg-[#07050A]/80 text-zinc-300'
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-4">
          <BrandLogo className="h-14 w-auto" />
          <div>
            <p className="text-lg font-black tracking-tight">BIOANIM GAMES</p>
            <p className="max-w-md text-xs font-semibold opacity-80">
              {t('footer_tagline')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-extrabold">
          <button
            type="button"
            onClick={() => onSelectPage('games')}
            className="cursor-pointer underline-offset-4 hover:underline"
          >
            {t('nav_games')}
          </button>
          <button
            type="button"
            onClick={() => onSelectPage('arcade')}
            className="cursor-pointer underline-offset-4 hover:underline"
          >
            {t('nav_arcade')}
          </button>
          <button
            type="button"
            onClick={() => onSelectPage('community')}
            className="cursor-pointer underline-offset-4 hover:underline"
          >
            {t('nav_community')}
          </button>
          <button
            type="button"
            onClick={() => onSelectPage('brand')}
            className="cursor-pointer underline-offset-4 hover:underline"
          >
            {t('nav_brand')}
          </button>
        </div>

        <div className="flex items-center gap-2.5 text-center text-xs font-bold opacity-80 md:text-right">
          <BioIcon
            name={theme === 'shine' ? 'shine-topo' : 'shady-topo'}
            size={26}
          />
          <div>
            <p>
              {theme === 'shine' ? 'SHINE FUN ACTIVE' : 'SHADY FUN ACTIVE'} •{' '}
              {locale.toUpperCase()}
            </p>
            <p className="mt-0.5">
              © {new Date().getFullYear()} Bioanim Games Studio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
