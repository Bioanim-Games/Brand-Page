import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useI18n } from '../../context/I18nContext';
import {
  BioIcon,
  getBioIconDataUrl,
  type BioIconName,
} from '../ui/BioIcon';

interface FallingEntity {
  id: number;
  x: number;
  y: number;
  radius: number;
  speed: number;
  kind: 'reward' | 'bonus' | 'hazard';
  spriteName: BioIconName;
}

interface FloatingPopup {
  x: number;
  y: number;
  text: string;
  alpha: number;
  color: string;
}

const SHINE_CALLOUTS = ['+15 COINS!', 'SHINE! +25', 'GREAT! +15'];
const SHADY_CALLOUTS = ['SMASHED!', 'BRUTAL!', 'CRUSHED!', 'BOOM!'];

export function BioDropArcadeGame() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Number(window.localStorage.getItem('bioanim_arcade_high') || 0);
    }
    return 0;
  });

  const bucketXRef = useRef(380);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const entitiesRef = useRef<FallingEntity[]>([]);
  const popupsRef = useRef<FloatingPopup[]>([]);
  const shakeFramesRef = useRef(0);
  const spriteImgMapRef = useRef<Partial<Record<BioIconName, HTMLImageElement>>>({});

  useEffect(() => {
    const names: BioIconName[] = [
      'shine-coins', 'shine-trophy', 'shine-heart', 'shine-pickaxe', 'shine-topo', 'shine-mallet',
      'shady-skull-bomb', 'shady-dynamite', 'shady-grenade', 'shady-beartrap', 'shady-topo', 'shady-bat',
    ];
    names.forEach((n) => {
      getBioIconDataUrl(n).then((url) => {
        if (!url) return;
        const img = new Image();
        img.src = url;
        img.onload = () => { spriteImgMapRef.current[n] = img; };
      }).catch(() => {});
    });
  }, []);

  const updateScore = (delta: number, resetCombo = false) => {
    const nextScore = Math.max(0, scoreRef.current + delta);
    scoreRef.current = nextScore; setScore(nextScore);
    const nextCombo = resetCombo ? 0 : comboRef.current + 1;
    comboRef.current = nextCombo; setCombo(nextCombo);
    if (nextScore > highScore) {
      setHighScore(nextScore);
      window.localStorage.setItem('bioanim_arcade_high', String(nextScore));
    }
  };

  const resetGame = () => {
    scoreRef.current = 0; comboRef.current = 0;
    entitiesRef.current = []; popupsRef.current = [];
    setScore(0); setCombo(0);
  };

  // Clear active entities when theme switches so only the active theme's icons appear
  useEffect(() => {
    entitiesRef.current = [];
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 760;
    const H = 440;
    canvas.width = W;
    canvas.height = H;

    let rafId = 0;
    let spawnCounter = 0;
    let idSeq = 1;

    const loop = () => {
      ctx.save();
      if (shakeFramesRef.current > 0) {
        shakeFramesRef.current -= 1;
        ctx.translate((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
      }

      if (theme === 'shine') {
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#FFFDF7');
        grad.addColorStop(1, '#FEF3C7');
        ctx.fillStyle = grad;
      } else {
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#0D0A12');
        grad.addColorStop(1, '#1C100B');
        ctx.fillStyle = grad;
      }
      ctx.fillRect(0, 0, W, H);

      if (isRunning) {
        spawnCounter += 1;
        // Relaxed spawn rate: every 62 frames (~1 second)
        if (spawnCounter >= 62) {
          spawnCounter = 0;
          const rand = Math.random();
          let kind: FallingEntity['kind'] = 'reward';
          let spriteName: BioIconName = 'shine-coins';

          if (theme === 'shine') {
            if (rand < 0.2) { kind = 'hazard'; spriteName = 'shine-pickaxe'; }
            else if (rand < 0.75) { kind = 'reward'; spriteName = 'shine-coins'; }
            else { kind = 'bonus'; spriteName = 'shine-trophy'; }
          } else {
            if (rand < 0.2) { kind = 'hazard'; spriteName = 'shady-beartrap'; }
            else if (rand < 0.75) { kind = 'reward'; spriteName = 'shady-skull-bomb'; }
            else { kind = 'bonus'; spriteName = 'shady-dynamite'; }
          }

          // Lower, comfortable falling speed: 1.10 to 1.85 px/frame
          entitiesRef.current.push({
            id: idSeq++,
            x: 50 + Math.random() * (W - 100),
            y: -30,
            radius: 28,
            speed: 1.1 + Math.random() * 0.75,
            kind,
            spriteName,
          });
        }

        const bX = bucketXRef.current;
        const bY = H - 56;
        const bHalfW = 62;

        const remaining: FallingEntity[] = [];
        for (const ent of entitiesRef.current) {
          ent.y += ent.speed;

          const sprite = spriteImgMapRef.current[ent.spriteName];
          if (sprite) {
            ctx.drawImage(
              sprite,
              ent.x - ent.radius,
              ent.y - ent.radius,
              ent.radius * 2,
              ent.radius * 2
            );
          }

          const hitBucket =
            Math.abs(ent.x - bX) < bHalfW + ent.radius * 0.5 &&
            ent.y + ent.radius >= bY &&
            ent.y - ent.radius <= bY + 34;

          if (hitBucket) {
            if (ent.kind === 'hazard') {
              shakeFramesRef.current = 10;
              updateScore(-10, true);
              popupsRef.current.push({
                x: ent.x,
                y: ent.y,
                text: 'OUCH! -10',
                alpha: 1,
                color: '#DC2626',
              });
            } else {
              const pts = ent.kind === 'bonus' ? 25 : 15;
              updateScore(pts, false);
              const pool = theme === 'shine' ? SHINE_CALLOUTS : SHADY_CALLOUTS;
              const label = pool[Math.floor(Math.random() * pool.length)];
              popupsRef.current.push({
                x: ent.x,
                y: ent.y,
                text: label,
                alpha: 1,
                color: theme === 'shine' ? '#16100C' : '#FF5500',
              });
            }
            continue;
          }

          if (ent.y < H + 30) {
            remaining.push(ent);
          }
        }
        entitiesRef.current = remaining;
      }

      // Draw Player Bar with Strictly Theme-Matched Topo Sprite
      const bx = bucketXRef.current;
      const by = H - 52;
      ctx.fillStyle = theme === 'shine' ? '#16100C' : '#27272A';
      ctx.strokeStyle = theme === 'shine' ? '#F59E0B' : '#FF5500';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(bx - 60, by, 120, 32, 16);
      ctx.fill();
      ctx.stroke();

      const barSprite =
        spriteImgMapRef.current[
          theme === 'shine' ? 'shine-topo' : 'shady-topo'
        ];
      if (barSprite) {
        ctx.drawImage(barSprite, bx - 48, by - 4, 36, 36);
      }

      ctx.fillStyle = theme === 'shine' ? '#FDE68A' : '#FF5500';
      ctx.font = '900 11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        theme === 'shine' ? 'SHINE TOPO' : 'SHADY TOPO',
        bx + 14,
        by + 20
      );

      const nextPopups: FloatingPopup[] = [];
      for (const pop of popupsRef.current) {
        pop.y -= 1.0;
        pop.alpha -= 0.022;
        if (pop.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = pop.alpha;
          ctx.font = '900 15px system-ui, sans-serif';
          ctx.fillStyle = pop.color;
          ctx.textAlign = 'center';
          ctx.fillText(pop.text, pop.x, pop.y);
          ctx.restore();
          nextPopups.push(pop);
        }
      }
      popupsRef.current = nextPopups;

      if (!isRunning) {
        ctx.fillStyle = 'rgba(10, 8, 13, 0.55)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '900 20px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          theme === 'shine'
            ? 'Move to catch Gold Coins & Trophies (Avoid Pickaxes)!'
            : 'Click or sweep to smash Skull Bombs & Dynamite (Avoid Bear Traps)!',
          W / 2,
          H / 2
        );
      }

      ctx.restore();
      rafId = window.requestAnimationFrame(loop);
    };

    rafId = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(rafId);
  }, [isRunning, theme]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 760;
    bucketXRef.current = Math.max(64, Math.min(696, relX));
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isRunning) {
      setIsRunning(true);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 760;
    const clickY = ((e.clientY - rect.top) / rect.height) * 440;

    const survivors: FallingEntity[] = [];
    for (const ent of entitiesRef.current) {
      const dist = Math.hypot(ent.x - clickX, ent.y - clickY);
      if (dist <= ent.radius + 28) {
        shakeFramesRef.current = 5;
        updateScore(20, false);
        popupsRef.current.push({
          x: ent.x,
          y: ent.y,
          text: 'SMASH! +20',
          alpha: 1,
          color: '#FF5500',
        });
      } else {
        survivors.push(ent);
      }
    }
    entitiesRef.current = survivors;
  };

  return (
    <div className="space-y-6">
      {/* Open HUD Bar with Theme-Divided Shiny vs Shady Icons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2.5 text-base font-black">
            <BioIcon
              name={theme === 'shine' ? 'shine-coins' : 'shady-skull-bomb'}
              size={32}
            />
            <span>
              {t('arcade_score')}: {score}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-base font-black">
            <BioIcon
              name={theme === 'shine' ? 'shine-trophy' : 'shady-fist-up'}
              size={32}
            />
            <span>
              {t('arcade_best')}: {highScore}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm font-black opacity-80">
            <BioIcon
              name={theme === 'shine' ? 'shine-mallet' : 'shady-bat'}
              size={28}
            />
            <span>
              {t('arcade_combo')}: x{combo}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsRunning((r) => !r)}
            className={`flex cursor-pointer items-center gap-2 rounded-full px-6 py-2.5 text-sm font-black ${
              theme === 'shine'
                ? 'bg-[#16100C] text-amber-300 shadow-md'
                : 'bg-orange-600 text-white shadow-[0_0_16px_rgba(255,85,0,0.45)]'
            }`}
          >
            <BioIcon
              name={theme === 'shine' ? 'shine-arcade-pad' : 'shady-gamepad'}
              size={24}
            />
            <span>{isRunning ? t('arcade_pause') : t('arcade_start')}</span>
          </button>
          <button
            type="button"
            onClick={resetGame}
            className={`cursor-pointer rounded-full px-4 py-2.5 text-xs font-extrabold ${
              theme === 'shine'
                ? 'bg-amber-200/70 text-[#16100C]'
                : 'bg-zinc-900 text-zinc-300'
            }`}
          >
            {t('arcade_reset')}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden rounded-3xl ${
          theme === 'shine'
            ? 'shadow-xl ring-1 ring-[#16100C]/15'
            : 'shadow-[0_0_40px_rgba(255,85,0,0.2)] ring-1 ring-orange-500/40'
        }`}
      >
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onClick={handleCanvasClick}
          className="aspect-[760/440] w-full cursor-crosshair touch-none block"
        />
      </div>
    </div>
  );
}
