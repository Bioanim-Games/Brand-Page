import type { LocaleCode, LocaleMeta } from '../types/app';

/**
 * Exact 9 locales used in Topo Smash (whack-a-mole/scripts/data/translations_data.gd)
 * Default fallback locale: es_419 (Español - Latinoamérica)
 */
export const DEFAULT_LOCALE: LocaleCode = 'es_419';

export const SUPPORTED_LOCALES: LocaleMeta[] = [
  { code: 'es_419', flag: '🇲🇽', label: 'Español (Latinoamérica)', shortLabel: 'ES-LATAM' },
  { code: 'es_ES', flag: '🇪🇸', label: 'Español (España)', shortLabel: 'ES-ES' },
  { code: 'pt', flag: '🇧🇷', label: 'Português', shortLabel: 'PT-BR' },
  { code: 'fr', flag: '🇫🇷', label: 'Français', shortLabel: 'FR' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch', shortLabel: 'DE' },
  { code: 'en', flag: '🇺🇸', label: 'English', shortLabel: 'EN' },
  { code: 'ko', flag: '🇰🇷', label: '한국어', shortLabel: 'KO' },
  { code: 'ja', flag: '🇯🇵', label: '日本語', shortLabel: 'JA' },
  { code: 'zh_CN', flag: '🇨🇳', label: '简体中文', shortLabel: 'ZH' },
];

export function mapRawLocaleToSupported(rawLocale: string | undefined): LocaleCode {
  if (!rawLocale) return DEFAULT_LOCALE;
  const clean = rawLocale.trim().replace(/-/g, '_').toLowerCase();
  if (!clean) return DEFAULT_LOCALE;

  if (clean === 'es_es' || clean.startsWith('es_es_')) return 'es_ES';
  if (clean === 'es' || clean.startsWith('es_')) return 'es_419';
  if (clean === 'pt' || clean.startsWith('pt_')) return 'pt';
  if (clean === 'fr' || clean.startsWith('fr_')) return 'fr';
  if (clean === 'de' || clean.startsWith('de_')) return 'de';
  if (clean === 'en' || clean.startsWith('en_')) return 'en';
  if (clean === 'ko' || clean.startsWith('ko_')) return 'ko';
  if (clean === 'ja' || clean.startsWith('ja_')) return 'ja';
  if (clean === 'zh' || clean.startsWith('zh_')) return 'zh_CN';

  return DEFAULT_LOCALE;
}

export function detectInitialLocale(): LocaleCode {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const saved = window.localStorage.getItem('bioanim_locale') as LocaleCode | null;
  if (saved && SUPPORTED_LOCALES.some((item) => item.code === saved)) {
    return saved;
  }
  return mapRawLocaleToSupported(window.navigator.language);
}
