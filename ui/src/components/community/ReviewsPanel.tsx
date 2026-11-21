import { useState } from 'react';
import { motion } from 'motion/react';
import type { PlayerReviewItem, ReviewTopic, ThemeMode } from '../../types/app';
import { useTheme } from '../../context/ThemeContext';
import { useI18n } from '../../context/I18nContext';
import { INITIAL_REVIEWS } from '../../data/communitySeed';
import { BioIcon, type BioIconName } from '../ui/BioIcon';

function getTopicIcon(
  topic: Exclude<ReviewTopic, 'all'>,
  theme: ThemeMode
): BioIconName {
  if (topic === 'topo-smash') {
    return theme === 'shine' ? 'shine-topo' : 'shady-topo';
  }
  if (topic === 'bomberoman') {
    return theme === 'shine' ? 'shine-fire-helmet' : 'shady-battle-axe';
  }
  return theme === 'shine' ? 'shine-trophy' : 'shady-fist-up';
}

export function ReviewsPanel() {
  const { theme } = useTheme();
  const { t } = useI18n();

  const [reviews, setReviews] = useState<PlayerReviewItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('bioanim_reviews_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return INITIAL_REVIEWS;
        }
      }
    }
    return INITIAL_REVIEWS;
  });

  const [filterTopic, setFilterTopic] = useState<ReviewTopic>('all');
  const [author, setAuthor] = useState('');
  const [topic, setTopic] = useState<Exclude<ReviewTopic, 'all'>>('topo-smash');
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [comment, setComment] = useState('');

  const saveReviews = (next: PlayerReviewItem[]) => {
    setReviews(next);
    window.localStorage.setItem('bioanim_reviews_v2', JSON.stringify(next));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newItem: PlayerReviewItem = {
      id: `rev-${Date.now()}`,
      author:
        author.trim() || (theme === 'shine' ? 'SunnyPlayer' : 'ShadyRebel'),
      avatarEmoji: '',
      topic,
      rating,
      vibeTag: theme,
      comment: comment.trim(),
      createdAt: 'Just now',
      likes: 1,
    };
    saveReviews([newItem, ...reviews]);
    setComment('');
  };

  const handleLike = (id: string) => {
    const next = reviews.map((r) =>
      r.id === id ? { ...r, likes: r.likes + 1 } : r
    );
    saveReviews(next);
  };

  const visibleReviews =
    filterTopic === 'all'
      ? reviews
      : reviews.filter((r) => r.topic === filterTopic);

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <BioIcon
            name={theme === 'shine' ? 'shine-trophy' : 'shady-fist-up'}
            size={32}
          />
          <h2
            className={`text-2xl font-black tracking-tight ${
              theme === 'shine' ? 'text-[#16100C]' : 'text-white'
            }`}
          >
            {t('reviews_heading')}
          </h2>
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs font-extrabold">
          {(['all', 'topo-smash', 'bomberoman', 'studio'] as ReviewTopic[]).map(
            (tp) => (
              <button
                key={tp}
                type="button"
                onClick={() => setFilterTopic(tp)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 capitalize transition-all ${
                  filterTopic === tp
                    ? theme === 'shine'
                      ? 'bg-[#16100C] text-amber-300'
                      : 'bg-orange-600 text-white'
                    : theme === 'shine'
                      ? 'bg-amber-100/80 text-[#4A3728]'
                      : 'bg-zinc-900 text-zinc-400'
                }`}
              >
                {tp.replace('-', ' ')}
              </button>
            )
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`space-y-3 rounded-3xl p-5 ${
          theme === 'shine'
            ? 'bg-amber-100/50'
            : 'border border-zinc-800/80 bg-zinc-900/50'
        }`}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder={t('reviews_name_ph')}
            className={`rounded-2xl px-3.5 py-2 text-xs font-bold outline-none sm:text-sm ${
              theme === 'shine'
                ? 'bg-white text-[#16100C]'
                : 'bg-zinc-950 text-white'
            }`}
          />

          <select
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value as Exclude<ReviewTopic, 'all'>)
            }
            className={`rounded-2xl px-3.5 py-2 text-xs font-bold outline-none sm:text-sm ${
              theme === 'shine'
                ? 'bg-white text-[#16100C]'
                : 'bg-zinc-950 text-white'
            }`}
          >
            <option value="topo-smash">Topo Smash</option>
            <option value="bomberoman">Bomberoman (Concept)</option>
            <option value="studio">Bioanim Studio</option>
          </select>

          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-black">Score:</span>
            <div className="flex gap-1">
              {([1, 2, 3, 4, 5] as const).map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`cursor-pointer transition-opacity ${
                    star <= rating ? 'opacity-100' : 'opacity-25'
                  }`}
                >
                  <BioIcon
                    name={
                      theme === 'shine' ? 'shine-coins' : 'shady-skull-bomb'
                    }
                    size={20}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <textarea
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t('reviews_comment_ph')}
          className={`w-full rounded-2xl p-3.5 text-xs font-semibold outline-none sm:text-sm ${
            theme === 'shine'
              ? 'bg-white text-[#16100C]'
              : 'bg-zinc-950 text-white'
          }`}
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold opacity-70">
            Vibe: {theme === 'shine' ? 'Shine Fun' : 'Shady Fun'}
          </span>
          <button
            type="submit"
            className={`cursor-pointer rounded-full px-5 py-2 text-xs font-black sm:text-sm ${
              theme === 'shine'
                ? 'bg-[#16100C] text-amber-300'
                : 'bg-orange-600 text-white'
            }`}
          >
            {t('reviews_add_btn')}
          </button>
        </div>
      </form>

      <div
        className={`divide-y ${
          theme === 'shine' ? 'divide-[#16100C]/10' : 'divide-zinc-800'
        }`}
      >
        {visibleReviews.map((rev) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <BioIcon name={getTopicIcon(rev.topic, theme)} size={28} />
                <span className="text-sm font-black">{rev.author}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                    rev.vibeTag === 'shine'
                      ? 'bg-amber-200 text-[#16100C]'
                      : 'bg-orange-950 text-orange-300'
                  }`}
                >
                  {rev.vibeTag}
                </span>
                <span className="text-xs font-bold opacity-60">
                  #{rev.topic}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="opacity-60">{rev.createdAt}</span>
                <button
                  type="button"
                  onClick={() => handleLike(rev.id)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-xs font-extrabold hover:opacity-80"
                >
                  <BioIcon
                    name={
                      theme === 'shine' ? 'shine-heart' : 'shady-demon-heart'
                    }
                    size={20}
                  />
                  <span>{rev.likes}</span>
                </button>
              </div>
            </div>

            <p className="mt-2.5 text-sm font-medium leading-relaxed opacity-90 sm:text-base">
              {rev.comment}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
