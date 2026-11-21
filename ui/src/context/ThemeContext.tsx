import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import type { ShineWaveMode, ThemeMode, TransitionRequest } from '../types/app';

interface ThemeContextValue {
  theme: ThemeMode;
  shineWaveMode: ShineWaveMode;
  setShineWaveMode: (mode: ShineWaveMode) => void;
  isTransitioning: boolean;
  activeTransition: TransitionRequest | null;
  triggerThemeToggle: (originX?: number, originY?: number, targetTheme?: ThemeMode) => void;
  completeTransition: () => void;
  vibe: <T>(shineVal: T, shadyVal: T) => T;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('bioanim_theme');
      if (saved === 'shine' || saved === 'shady') return saved;
    }
    return 'shine';
  });

  const [shineWaveMode, setShineWaveModeState] = useState<ShineWaveMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('bioanim_wave_mode');
      if (saved === 'circle' || saved === 'line') return saved;
    }
    return 'circle';
  });

  const [activeTransition, setActiveTransition] = useState<TransitionRequest | null>(null);
  const seqRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-shine', 'theme-shady', 'dark');
    if (theme === 'shady') {
      root.classList.add('theme-shady', 'dark');
    } else {
      root.classList.add('theme-shine');
    }
    window.localStorage.setItem('bioanim_theme', theme);
  }, [theme]);

  const setShineWaveMode = (mode: ShineWaveMode) => {
    setShineWaveModeState(mode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('bioanim_wave_mode', mode);
    }
  };

  const triggerThemeToggle = (
    originX?: number,
    originY?: number,
    targetTheme?: ThemeMode
  ) => {
    if (activeTransition) return;
    const nextTheme: ThemeMode = targetTheme ?? (theme === 'shine' ? 'shady' : 'shine');
    if (nextTheme === theme) return;

    const x = originX ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
    const y = originY ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 300);

    seqRef.current += 1;
    setActiveTransition({
      id: seqRef.current,
      from: theme,
      to: nextTheme,
      originX: x,
      originY: y,
      waveMode: shineWaveMode,
    });

    // Switch live DOM right away while the canvas mask holds the previous theme layer and carves it out drop-by-drop or wave-by-wave
    setTheme(nextTheme);
  };

  const completeTransition = () => {
    setActiveTransition(null);
  };

  const vibe = <T,>(shineVal: T, shadyVal: T): T => {
    return theme === 'shine' ? shineVal : shadyVal;
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        shineWaveMode,
        setShineWaveMode,
        isTransitioning: activeTransition !== null,
        activeTransition,
        triggerThemeToggle,
        completeTransition,
        vibe,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }
  return ctx;
}
