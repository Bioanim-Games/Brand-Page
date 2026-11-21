import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../context/I18nContext';
import { BioDropArcadeGame } from '../components/arcade/BioDropArcadeGame';
import { BioIcon } from '../components/ui/BioIcon';

export function MinigamePage() {
  const { theme } = useTheme();
  const { t, tv } = useI18n();

  return (
    <section className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-8">
      <div className="space-y-3 text-left">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-75">
          <BioIcon
            name={theme === 'shine' ? 'shine-arcade-pad' : 'shady-skull-bomb'}
            size={28}
          />
          <span>
            {theme === 'shine'
              ? 'SHINE ARCADE STAGE'
              : 'SHADY UNDERGROUND STAGE'}
          </span>
        </div>
        <h1
          className={`text-3xl font-black tracking-tight sm:text-5xl ${
            theme === 'shine' ? 'text-[#16100C]' : 'text-white'
          }`}
        >
          {tv('arcade_title', theme)}
        </h1>
        <p
          className={`max-w-2xl text-base font-medium ${
            theme === 'shine' ? 'text-[#5C4738]' : 'text-zinc-300'
          }`}
        >
          {tv('arcade_sub', theme)}
        </p>
      </div>

      <BioDropArcadeGame />

      <p
        className={`pt-2 text-left text-xs font-bold opacity-70 ${
          theme === 'shine' ? 'text-[#5C4738]' : 'text-amber-300'
        }`}
      >
        {t('arcade_slot_note')}
      </p>
    </section>
  );
}
