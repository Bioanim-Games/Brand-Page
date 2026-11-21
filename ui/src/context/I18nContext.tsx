import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { LocaleCode, LocaleMeta, ThemeMode } from '../types/app';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  detectInitialLocale,
} from '../i18n/locales';
import {
  TRANSLATIONS_AMERICAS_EU,
  type TranslationDictionary,
} from '../i18n/translations-americas-eu';
import { TRANSLATIONS_GLOBAL_ASIA } from '../i18n/translations-global-asia';

const ALL_CATALOGS: Record<LocaleCode, TranslationDictionary> = {
  ...TRANSLATIONS_AMERICAS_EU,
  ...TRANSLATIONS_GLOBAL_ASIA,
};

interface I18nContextValue {
  locale: LocaleCode;
  setLocale: (code: LocaleCode) => void;
  supportedLocales: LocaleMeta[];
  t: (key: string) => string;
  tv: (baseKey: string, theme: ThemeMode) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(() => detectInitialLocale());

  const setLocale = (code: LocaleCode) => {
    setLocaleState(code);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('bioanim_locale', code);
    }
  };

  useEffect(() => {
    document.documentElement.lang = locale.replace('_', '-');
  }, [locale]);

  const t = (key: string): string => {
    const activeDict = ALL_CATALOGS[locale] ?? ALL_CATALOGS[DEFAULT_LOCALE];
    return activeDict[key] ?? ALL_CATALOGS.en[key] ?? ALL_CATALOGS[DEFAULT_LOCALE][key] ?? key;
  };

  const tv = (baseKey: string, theme: ThemeMode): string => {
    return t(`${baseKey}_${theme}`);
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        supportedLocales: SUPPORTED_LOCALES,
        t,
        tv,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used inside an I18nProvider');
  }
  return ctx;
}
