import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

const SHADY_DRIPS = [
  { id: 1, left: '6%', width: 14, height: 48, delay: 0 },
  { id: 2, left: '22%', width: 10, height: 34, delay: 0.6 },
  { id: 3, left: '46%', width: 18, height: 64, delay: 1.1 },
  { id: 4, left: '68%', width: 12, height: 40, delay: 0.3 },
  { id: 5, left: '88%', width: 16, height: 56, delay: 0.9 },
];

export function AmbientBackground() {
  const { theme } = useTheme();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {theme === 'shine' ? (
        <>
          {/* Clean, breathable sunlit aura on open plain canvas */}
          <div className="absolute -top-40 left-1/3 h-[560px] w-[960px] -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="absolute top-[45%] right-[-10%] h-[460px] w-[460px] rounded-full bg-orange-300/15 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[10%] h-[420px] w-[620px] rounded-full bg-yellow-200/25 blur-3xl" />
        </>
      ) : (
        <>
          {/* Deep nocturnal ambient glow on open dark canvas */}
          <div className="absolute -top-32 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-orange-600/12 blur-3xl" />
          <div className="absolute top-[50%] left-[-8%] h-[420px] w-[420px] rounded-full bg-rose-600/8 blur-3xl" />

          {/* Subtle living top-edge ink drips */}
          <div className="absolute inset-x-0 top-0 h-24">
            {SHADY_DRIPS.map((drip) => (
              <motion.div
                key={drip.id}
                style={{ left: drip.left, width: drip.width }}
                animate={{
                  height: [drip.height, drip.height + 22, drip.height],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  delay: drip.delay,
                  ease: 'easeInOut',
                }}
                className="absolute top-0 rounded-b-full bg-gradient-to-b from-black via-zinc-950 to-orange-600/70 shadow-[0_4px_14px_rgba(255,85,0,0.35)]"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
