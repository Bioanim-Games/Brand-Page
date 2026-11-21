export type ThemeMode = 'shine' | 'shady';

export type ShineWaveMode = 'circle' | 'line';

export type PageRoute = 'games' | 'arcade' | 'community' | 'brand';

export type LocaleCode =
  | 'es_419'
  | 'es_ES'
  | 'pt'
  | 'fr'
  | 'de'
  | 'en'
  | 'ko'
  | 'ja'
  | 'zh_CN';

export interface LocaleMeta {
  code: LocaleCode;
  flag: string;
  label: string;
  shortLabel: string;
}

export type GameDevelopmentStatus = 'in-development' | 'concept' | 'mystery';

export interface DualVibeText {
  shine: string;
  shady: string;
}

export interface GameCatalogItem {
  id: 'topo-smash' | 'bomberoman' | 'mystery-project-3';
  title: string;
  subtitleKey: string;
  workingTitleNoteKey?: string;
  status: GameDevelopmentStatus;
  progressPercent: number;
  genres: string[];
  revealImage?: string;
  hidePreviewSpoilers: boolean;
  supportedLocales?: LocaleCode[];
  engineBadge: string;
  shineSummaryKey: string;
  shadySummaryKey: string;
  highlightsKeys: string[];
}

export type ReviewTopic = 'all' | 'topo-smash' | 'bomberoman' | 'studio';

export interface PlayerReviewItem {
  id: string;
  author: string;
  avatarEmoji: string;
  topic: Exclude<ReviewTopic, 'all'>;
  rating: 1 | 2 | 3 | 4 | 5;
  vibeTag: ThemeMode;
  comment: string;
  createdAt: string;
  likes: number;
}

export type ChatChannelId =
  | 'general-hype'
  | 'topo-smash-lab'
  | 'bomberoman-concept'
  | 'shady-after-dark';

export interface ChatMessageItem {
  id: string;
  channel: ChatChannelId;
  author: string;
  badge: string;
  vibe: ThemeMode;
  text: string;
  timestamp: string;
  reactions: Record<string, number>;
}

export interface TransitionRequest {
  id: number;
  from: ThemeMode;
  to: ThemeMode;
  originX: number;
  originY: number;
  waveMode: ShineWaveMode;
}
