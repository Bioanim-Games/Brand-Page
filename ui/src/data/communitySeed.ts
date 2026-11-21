import type { ChatMessageItem, PlayerReviewItem } from '../types/app';

export const INITIAL_REVIEWS: PlayerReviewItem[] = [
  {
    id: 'rev-1',
    author: 'PixelHammer_MX',
    avatarEmoji: '',
    topic: 'topo-smash',
    rating: 5,
    vibeTag: 'shine',
    comment:
      'Increíble que Topo Smash venga con 9 idiomas desde el primer día. El estilo de madera y miel del logo se ve brutal.',
    createdAt: '2h ago',
    likes: 18,
  },
  {
    id: 'rev-2',
    author: 'NightInk_99',
    avatarEmoji: '',
    topic: 'studio',
    rating: 5,
    vibeTag: 'shady',
    comment:
      'That black ink drip transition into Shady Fun mode is straight up addictive. Pure underground arcade vibes!',
    createdAt: '5h ago',
    likes: 24,
  },
  {
    id: 'rev-3',
    author: 'FireAxe_Kenta',
    avatarEmoji: '',
    topic: 'bomberoman',
    rating: 5,
    vibeTag: 'shady',
    comment:
      'Excited for the Firefighter concept queued up after Topo Smash!',
    createdAt: '1d ago',
    likes: 15,
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessageItem[] = [
  {
    id: 'msg-1',
    channel: 'general-hype',
    author: 'BioanimBot',
    badge: 'STUDIO',
    vibe: 'shine',
    text: 'Welcome to the Bioanim Games Community Lounge! Try flipping between Shine Fun and Shady Fun above.',
    timestamp: '12:00',
    reactions: { likes: 9 },
  },
  {
    id: 'msg-2',
    channel: 'general-hype',
    author: 'ShadowMole',
    badge: 'TESTER',
    vibe: 'shady',
    text: 'Team Shady Fun all day! That ink drip from top to bottom is so satisfying.',
    timestamp: '12:04',
    reactions: { likes: 11 },
  },
  {
    id: 'msg-3',
    channel: 'topo-smash-lab',
    author: 'HardHatLeo',
    badge: 'PLAYER',
    vibe: 'shine',
    text: '9 languages ready for Topo Smash! Tested Español, English, 日本語 and 한국어!',
    timestamp: '12:15',
    reactions: { likes: 14 },
  },
  {
    id: 'msg-4',
    channel: 'bomberoman-concept',
    author: 'BlazeRunner',
    badge: 'CONCEPT FAN',
    vibe: 'shady',
    text: 'Hyped to see what the firefighter concept turns into after Topo Smash launches.',
    timestamp: '12:22',
    reactions: { likes: 12 },
  },
  {
    id: 'msg-5',
    channel: 'shady-after-dark',
    author: 'ViperArcade',
    badge: 'NIGHT OWL',
    vibe: 'shady',
    text: 'Just hit 420 points in the Shady Skull Bomb Smasher minigame!',
    timestamp: '12:30',
    reactions: { likes: 8 },
  },
];
