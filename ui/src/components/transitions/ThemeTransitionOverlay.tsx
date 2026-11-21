import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface InkDropColumn {
  xCenter: number;
  width: number;
  delay: number;
  speedMultiplier: number;
  wobblePhase: number;
  subDropOffset: number;
}

function easeInCubic(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * clamped;
}

function easeInOutCubic(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}

export function ThemeTransitionOverlay() {
  const { activeTransition, completeTransition } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!activeTransition) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      completeTransition();
      return;
    }

    const w = Math.max(1, window.innerWidth);
    const h = Math.max(1, window.innerHeight);
    canvas.width = w;
    canvas.height = h;

    const isToShady = activeTransition.to === 'shady';
    const duration = isToShady ? 1150 : 860;
    const startTime = performance.now();

    // Generate independent ink drops for Shine -> Shady
    const dropCount = w < 768 ? 16 : 28;
    const colStep = w / dropCount;
    const drops: InkDropColumn[] = Array.from({ length: dropCount }, (_, i) => {
      const seed1 = Math.sin(i * 12.9898 + activeTransition.id) * 43758.5453;
      const rand1 = seed1 - Math.floor(seed1);
      const seed2 = Math.cos(i * 78.233 + activeTransition.id) * 19341.123;
      const rand2 = seed2 - Math.floor(seed2);

      return {
        xCenter: i * colStep + colStep * 0.5,
        width: colStep * (1.28 + rand1 * 0.35),
        delay: rand1 * 0.28,
        speedMultiplier: 1.05 + rand2 * 0.45,
        wobblePhase: rand1 * Math.PI * 2,
        subDropOffset: 24 + rand2 * 38,
      };
    });

    let rafId = 0;

    const renderFrame = (now: number) => {
      try {
        // Guard against negative elapsed time when requestAnimationFrame timestamp precedes performance.now()
        const elapsed = Math.max(0, now - startTime);
        const rawProgress = Math.max(0, Math.min(1, elapsed / duration));

        ctx.clearRect(0, 0, w, h);

        if (isToShady) {
          // 1. Fill canvas with outgoing Shine Fun warm cream layer
          ctx.globalCompositeOperation = 'source-over';
          const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
          bgGrad.addColorStop(0, '#FFFDF6');
          bgGrad.addColorStop(1, '#FEF3C7');
          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, w, h);

          // 2. Carve out each individual falling black ink drop column
          for (const drop of drops) {
            const localT = Math.max(
              0,
              Math.min(
                1,
                ((rawProgress - drop.delay) / Math.max(0.01, 1 - drop.delay)) *
                  drop.speedMultiplier
              )
            );
            if (localT <= 0) continue;

            const eased = easeInCubic(localT);
            const tipY = Math.max(0, eased * (h + 140));
            const halfW = Math.max(1, drop.width * 0.5);
            const bulbR = Math.max(1, halfW * 1.12);

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.rect(
              drop.xCenter - halfW,
              0,
              drop.width,
              Math.max(0, tipY - bulbR * 0.3)
            );
            ctx.arc(drop.xCenter, tipY, bulbR, 0, Math.PI * 2);
            if (tipY < h) {
              ctx.arc(
                drop.xCenter + Math.sin(localT * 8 + drop.wobblePhase) * 4,
                tipY + drop.subDropOffset,
                Math.max(0.5, bulbR * 0.38),
                0,
                Math.PI * 2
              );
            }
            ctx.fill();

            // 3. Glossy black ink & molten orange rim around falling droplet tip
            if (tipY < h + 90) {
              ctx.globalCompositeOperation = 'source-over';
              ctx.beginPath();
              ctx.arc(drop.xCenter, tipY, bulbR, 0, Math.PI);
              ctx.lineWidth = 7;
              ctx.strokeStyle = '#07050A';
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(
                drop.xCenter - bulbR * 0.25,
                tipY + bulbR * 0.15,
                Math.max(0.5, bulbR * 0.55),
                0.2,
                Math.PI - 0.8
              );
              ctx.lineWidth = 3.5;
              ctx.strokeStyle = '#FF5500';
              ctx.stroke();
            }
          }
        } else {
          // Shady Fun -> Shine Fun
          ctx.globalCompositeOperation = 'source-over';
          ctx.fillStyle = '#0A080D';
          ctx.fillRect(0, 0, w, h);

          const eased = easeInOutCubic(rawProgress);

          if (activeTransition.waveMode === 'circle') {
            // Mode A: Expanding Radiant Golden Circle Portal from toggle button / center
            const ox = activeTransition.originX;
            const oy = activeTransition.originY;
            const maxRadius =
              Math.hypot(Math.max(ox, w - ox), Math.max(oy, h - oy)) + 80;
            // Strictly clamp radius >= 0.5 so ctx.arc never throws IndexSizeError
            const currentR = Math.max(0.5, eased * maxRadius);

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(ox, oy, currentR, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalCompositeOperation = 'source-over';
            ctx.save();
            ctx.beginPath();
            ctx.arc(ox, oy, currentR, 0, Math.PI * 2);
            ctx.lineWidth = 16;
            ctx.strokeStyle = '#F59E0B';
            ctx.shadowColor = '#FBBF24';
            ctx.shadowBlur = 35;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(ox, oy, currentR, 0, Math.PI * 2);
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#FFFBEB';
            ctx.stroke();
            ctx.restore();
          } else {
            // Mode B: Left-to-Right Full-Height Vertical Laser Conversion Line
            const lineX = -40 + eased * (w + 100);

            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillRect(0, 0, Math.max(0, lineX), h);

            ctx.globalCompositeOperation = 'source-over';
            ctx.save();
            const glowGrad = ctx.createLinearGradient(
              lineX - 36,
              0,
              lineX + 36,
              0
            );
            glowGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
            glowGrad.addColorStop(0.45, 'rgba(245, 158, 11, 0.95)');
            glowGrad.addColorStop(0.5, '#FFFFFF');
            glowGrad.addColorStop(0.55, 'rgba(251, 191, 36, 0.95)');
            glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

            ctx.fillStyle = glowGrad;
            ctx.fillRect(lineX - 36, 0, 72, h);

            ctx.fillStyle = '#FFFBEB';
            ctx.shadowColor = '#F59E0B';
            ctx.shadowBlur = 28;
            ctx.fillRect(lineX - 3, 0, 6, h);
            ctx.restore();
          }
        }

        if (rawProgress < 1) {
          rafId = window.requestAnimationFrame(renderFrame);
        } else {
          completeTransition();
        }
      } catch {
        completeTransition();
      }
    };

    rafId = window.requestAnimationFrame(renderFrame);
    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [activeTransition, completeTransition]);

  if (!activeTransition) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] h-screen w-screen"
      aria-hidden="true"
    />
  );
}
