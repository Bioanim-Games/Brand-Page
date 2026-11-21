import { useState } from 'react';
import type { ChatChannelId, ChatMessageItem } from '../../types/app';
import { useTheme } from '../../context/ThemeContext';
import { useI18n } from '../../context/I18nContext';
import { INITIAL_CHAT_MESSAGES } from '../../data/communitySeed';
import { BioIcon } from '../ui/BioIcon';

const CHANNELS: { id: ChatChannelId; label: string }[] = [
  { id: 'general-hype', label: '#general-hype' },
  { id: 'topo-smash-lab', label: '#topo-smash-lab' },
  { id: 'bomberoman-concept', label: '#bomberoman' },
  { id: 'shady-after-dark', label: '#shady-after-dark' },
];

export function ChatLoungePanel() {
  const { theme } = useTheme();
  const { t } = useI18n();

  const [messages, setMessages] = useState<ChatMessageItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('bioanim_chat_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return INITIAL_CHAT_MESSAGES;
        }
      }
    }
    return INITIAL_CHAT_MESSAGES;
  });

  const [activeChannel, setActiveChannel] =
    useState<ChatChannelId>('general-hype');
  const [nickname, setNickname] = useState('');
  const [inputText, setInputText] = useState('');

  const persistMessages = (next: ChatMessageItem[]) => {
    setMessages(next);
    window.localStorage.setItem('bioanim_chat_v2', JSON.stringify(next));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newMsg: ChatMessageItem = {
      id: `msg-${Date.now()}`,
      channel: activeChannel,
      author:
        nickname.trim() || (theme === 'shine' ? 'ShineHero' : 'ShadyOutlaw'),
      badge: theme === 'shine' ? 'SHINE GUEST' : 'SHADY REBEL',
      vibe: theme,
      text: inputText.trim(),
      timestamp: timeStr,
      reactions: { likes: 1 },
    };

    persistMessages([...messages, newMsg]);
    setInputText('');
  };

  const channelMessages = messages.filter((m) => m.channel === activeChannel);

  return (
    <div className="flex h-full flex-col justify-between space-y-6 text-left">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BioIcon
              name={theme === 'shine' ? 'shine-heart' : 'shady-demon-heart'}
              size={28}
            />
            <h2
              className={`text-2xl font-black tracking-tight ${
                theme === 'shine' ? 'text-[#16100C]' : 'text-white'
              }`}
            >
              {t('chat_heading')}
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-black text-emerald-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            LOUNGE
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveChannel(ch.id)}
              className={`cursor-pointer rounded-full px-3 py-1 text-xs font-extrabold transition-all ${
                activeChannel === ch.id
                  ? theme === 'shine'
                    ? 'bg-[#16100C] text-amber-300'
                    : 'bg-orange-600 text-white'
                  : theme === 'shine'
                    ? 'bg-amber-100/80 text-[#4A3728]'
                    : 'bg-zinc-900 text-zinc-400'
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>

        <div
          className={`max-h-[420px] min-h-[280px] divide-y overflow-y-auto pr-2 ${
            theme === 'shine' ? 'divide-[#16100C]/10' : 'divide-zinc-800/80'
          }`}
        >
          {channelMessages.map((msg) => (
            <div key={msg.id} className="py-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BioIcon
                    name={theme === 'shine' ? 'shine-topo' : 'shady-topo'}
                    size={24}
                  />
                  <span className="text-xs font-black">{msg.author}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                      msg.vibe === 'shine'
                        ? 'bg-amber-200 text-[#16100C]'
                        : 'bg-orange-950 text-orange-300'
                    }`}
                  >
                    {msg.badge}
                  </span>
                </div>
                <span className="text-[11px] font-bold opacity-55">
                  {msg.timestamp}
                </span>
              </div>

              <p className="mt-1.5 pl-8 text-xs font-medium leading-relaxed sm:text-sm">
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSend} className="space-y-2.5 pt-2">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder={t('reviews_name_ph')}
          className={`w-full rounded-full px-4 py-2 text-xs font-bold outline-none ${
            theme === 'shine'
              ? 'bg-amber-100/70 text-[#16100C]'
              : 'bg-zinc-900 text-white'
          }`}
        />
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('chat_input_ph')}
            className={`flex-1 rounded-full px-4 py-2.5 text-xs font-bold outline-none sm:text-sm ${
              theme === 'shine'
                ? 'bg-amber-100/70 text-[#16100C]'
                : 'bg-zinc-900 text-white'
            }`}
          />
          <button
            type="submit"
            className={`cursor-pointer rounded-full px-5 py-2.5 text-xs font-black sm:text-sm ${
              theme === 'shine'
                ? 'bg-[#16100C] text-amber-300'
                : 'bg-orange-600 text-white'
            }`}
          >
            {t('chat_send')}
          </button>
        </div>
      </form>
    </div>
  );
}
