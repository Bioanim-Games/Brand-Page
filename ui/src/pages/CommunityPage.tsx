import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../context/I18nContext';
import { ReviewsPanel } from '../components/community/ReviewsPanel';
import { ChatLoungePanel } from '../components/community/ChatLoungePanel';

export function CommunityPage() {
  const { theme } = useTheme();
  const { t, tv } = useI18n();

  return (
    <section className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-8">
      {/* Open Header */}
      <div className="space-y-3 text-left">
        <h1
          className={`text-3xl font-black tracking-tight sm:text-5xl ${
            theme === 'shine' ? 'text-[#16100C]' : 'text-white'
          }`}
        >
          {tv('community_title', theme)}
        </h1>
        <p
          className={`max-w-3xl text-xs font-bold sm:text-sm ${
            theme === 'shine' ? 'text-amber-800' : 'text-orange-300/90'
          }`}
        >
          {t('community_phase_banner')}
        </p>
      </div>

      {/* Open Editorial 2-Column Split Separated by Subtle Vertical Hairline */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ReviewsPanel />
        </div>
        <div
          className={`lg:col-span-5 lg:border-l lg:pl-10 ${
            theme === 'shine' ? 'lg:border-[#16100C]/15' : 'lg:border-zinc-800'
          }`}
        >
          <ChatLoungePanel />
        </div>
      </div>
    </section>
  );
}
