import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../context/I18nContext';
import { BrandLogo } from '../components/layout/BrandLogo';
import { BioIcon } from '../components/ui/BioIcon';

export function BrandPage() {
  const { theme, shineWaveMode, setShineWaveMode, triggerThemeToggle } =
    useTheme();
  const { t, tv } = useI18n();

  return (
    <section className="mx-auto max-w-7xl space-y-20 px-4 py-12 sm:px-8">
      {/* 1. Open Studio Story & Logo Anatomy */}
      <div className="grid grid-cols-1 items-center gap-12 text-left lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider ${
              theme === 'shine'
                ? 'bg-amber-200/80 text-[#16100C]'
                : 'bg-orange-950/60 text-orange-300'
            }`}
          >
            <BioIcon
              name={theme === 'shine' ? 'shine-trophy' : 'shady-fist-up'}
              size={22}
            />
            <span>BIOANIM GAMES STUDIO DNA</span>
          </span>

          <h1
            className={`text-4xl font-black leading-tight tracking-tight sm:text-6xl ${
              theme === 'shine' ? 'text-[#16100C]' : 'text-white'
            }`}
          >
            {tv('brand_title', theme)}
          </h1>

          <p
            className={`max-w-2xl text-base font-medium leading-relaxed sm:text-xl ${
              theme === 'shine' ? 'text-[#5C4738]' : 'text-zinc-300'
            }`}
          >
            {tv('brand_sub', theme)}
          </p>
        </div>

        <div className="flex justify-center lg:col-span-5">
          <BrandLogo className="max-h-64 w-auto drop-shadow-[0_14px_24px_rgba(0,0,0,0.4)]" />
        </div>
      </div>

      {/* 2. Three Visual Pillars with Strictly Theme-Divided Shiny vs Shady Icons */}
      <div
        className={`grid grid-cols-1 gap-8 border-y py-12 text-left sm:grid-cols-3 ${
          theme === 'shine' ? 'border-[#16100C]/15' : 'border-zinc-800'
        }`}
      >
        <div className="space-y-3">
          <BioIcon
            name={theme === 'shine' ? 'shine-mallet' : 'shady-bat'}
            size={52}
          />
          <h3 className="text-xl font-black">Carved Organic Wood</h3>
          <p className="text-sm font-medium leading-relaxed opacity-80">
            Handcrafted wood grain inside every letter of our emblem gives our
            games a tactile, artisan warmth you can feel.
          </p>
        </div>

        <div className="space-y-3">
          <BioIcon
            name={theme === 'shine' ? 'shine-hardhat' : 'shady-skull-bomb'}
            size={52}
          />
          <h3 className="text-xl font-black">Rebellious Black Ink</h3>
          <p className="text-sm font-medium leading-relaxed opacity-80">
            Bold comic-graffiti outlines that drip down from the top of the
            screen drop-by-drop when Shady Fun takes over.
          </p>
        </div>

        <div className="space-y-3">
          <BioIcon
            name={theme === 'shine' ? 'shine-coins' : 'shady-fist-up'}
            size={52}
          />
          <h3 className="text-xl font-black">Molten Amber Energy</h3>
          <p className="text-sm font-medium leading-relaxed opacity-80">
            Golden honey brightness in Shine Fun that ignites into glowing
            molten copper in Shady Fun.
          </p>
        </div>
      </div>

      {/* 3. Interactive Dual-Soul Transition Laboratory */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Shine Fun Laboratory */}
        <div className="space-y-4 rounded-3xl bg-gradient-to-br from-[#FFF9E6] to-[#FDE68A] p-8 text-left text-[#16100C] shadow-lg">
          <div className="flex items-center gap-3">
            <BioIcon name="shine-topo" size={46} />
            <div>
              <span className="text-xs font-black uppercase tracking-wider opacity-70">
                LIGHT MODE
              </span>
              <h2 className="text-2xl font-black">Shine Fun</h2>
            </div>
          </div>

          <p className="text-sm font-medium leading-relaxed">
            Youthful, bouncy, sunlit arcade joy. Test both conversion waves
            below when switching from Shady Fun into Shine Fun:
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              type="button"
              onClick={(e) => {
                setShineWaveMode('circle');
                const rect = e.currentTarget.getBoundingClientRect();
                triggerThemeToggle(
                  rect.left + rect.width / 2,
                  rect.top,
                  'shine'
                );
              }}
              className="cursor-pointer rounded-full bg-[#16100C] px-4 py-2 text-xs font-black text-amber-300"
            >
              Test Circle Portal (
              {shineWaveMode === 'circle' ? 'Active' : 'Select'})
            </button>
            <button
              type="button"
              onClick={(e) => {
                setShineWaveMode('line');
                const rect = e.currentTarget.getBoundingClientRect();
                triggerThemeToggle(
                  rect.left + rect.width / 2,
                  rect.top,
                  'shine'
                );
              }}
              className="cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-black text-[#16100C]"
            >
              Test Vertical Laser Line (
              {shineWaveMode === 'line' ? 'Active' : 'Select'})
            </button>
          </div>
        </div>

        {/* Shady Fun Laboratory */}
        <div className="space-y-4 rounded-3xl border border-orange-500/30 bg-gradient-to-br from-[#120E17] to-[#1F120D] p-8 text-left text-white shadow-xl">
          <div className="flex items-center gap-3">
            <BioIcon name="shady-topo" size={46} />
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-orange-400">
                DARK MODE
              </span>
              <h2 className="text-2xl font-black text-orange-400">Shady Fun</h2>
            </div>
          </div>

          <p className="text-sm font-medium leading-relaxed text-zinc-300">
            Mature, rude, underground street-arcade attitude. Watch individual
            drops of black ink drip from the top and convert the page
            drop-by-drop:
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                triggerThemeToggle(
                  rect.left + rect.width / 2,
                  rect.top,
                  'shady'
                );
              }}
              className="cursor-pointer rounded-full bg-gradient-to-r from-orange-600 to-rose-600 px-5 py-2.5 text-xs font-black uppercase text-white shadow-[0_0_18px_rgba(255,85,0,0.45)]"
            >
              Trigger Per-Drop Black Ink Drip
            </button>
          </div>
        </div>
      </div>

      {/* 4. Open Brand Video Cinema */}
      <div className="space-y-6 text-left">
        <h2
          className={`text-2xl font-black tracking-tight sm:text-4xl ${
            theme === 'shine' ? 'text-[#16100C]' : 'text-white'
          }`}
        >
          {t('brand_videos_title')}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <video
              src="/assets/brand/logo-inicio-1.mp4"
              controls
              preload="metadata"
              className="aspect-video w-full rounded-3xl bg-black object-contain shadow-lg"
            />
            <p className="px-2 text-xs font-bold opacity-70">
              Logo Inicio #01 — Original Reveal
            </p>
          </div>

          <div className="space-y-2">
            <video
              src="/assets/brand/logo-inicio-2.mp4"
              controls
              preload="metadata"
              className="aspect-video w-full rounded-3xl bg-black object-contain shadow-lg"
            />
            <p className="px-2 text-xs font-bold opacity-70">
              Logo Inicio #02 — Alternative Cut
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
