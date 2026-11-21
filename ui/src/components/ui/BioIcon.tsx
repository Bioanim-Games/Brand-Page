export type BioIconName =
  // Shiny Fun native transparent PNGs
  | 'shine-gamepad'
  | 'shine-arcade-pad'
  | 'shine-mallet'
  | 'shine-hardhat'
  | 'shine-fire-helmet'
  | 'shine-axe'
  | 'shine-pickaxe'
  | 'shine-trophy'
  | 'shine-topo'
  | 'shine-coins'
  | 'shine-chest'
  | 'shine-heart'
  // Shady Fun native transparent PNGs
  | 'shady-gamepad'
  | 'shady-cage'
  | 'shady-grenade'
  | 'shady-bat'
  | 'shady-spiked-grenade'
  | 'shady-pistol'
  | 'shady-battle-axe'
  | 'shady-dynamite'
  | 'shady-skull-bomb'
  | 'shady-topo'
  | 'shady-beartrap'
  | 'shady-fist'
  | 'shady-heart'
  | 'shady-fist-up'
  | 'shady-demon-heart';

const ICON_PATH_MAP: Record<BioIconName, string> = {
  // Shiny Fun (.png only)
  'shine-gamepad': '/assets/icons/shiny/control-consola.png',
  'shine-arcade-pad': '/assets/icons/shiny/botonera.png',
  'shine-mallet': '/assets/icons/shiny/martillo.png',
  'shine-hardhat': '/assets/icons/shiny/casco-construccion-lentes.png',
  'shine-fire-helmet': '/assets/icons/shiny/casco-bombero.png',
  'shine-axe': '/assets/icons/shiny/hacha.png',
  'shine-pickaxe': '/assets/icons/shiny/pico.png',
  'shine-trophy': '/assets/icons/shiny/copa.png',
  'shine-topo': '/assets/icons/shiny/topo-feliz.png',
  'shine-coins': '/assets/icons/shiny/monedas.png',
  'shine-chest': '/assets/icons/shiny/cofre.png',
  'shine-heart': '/assets/icons/shiny/corazon.png',

  // Shady Fun (.png only)
  'shady-gamepad': '/assets/icons/shady/control-shady.png',
  'shady-cage': '/assets/icons/shady/jaula.png',
  'shady-grenade': '/assets/icons/shady/granada.png',
  'shady-bat': '/assets/icons/shady/bate.png',
  'shady-spiked-grenade': '/assets/icons/shady/granada.png',
  'shady-pistol': '/assets/icons/shady/pistola.png',
  'shady-battle-axe': '/assets/icons/shady/hacha-con-picos.png',
  'shady-dynamite': '/assets/icons/shady/tnt.png',
  'shady-skull-bomb': '/assets/icons/shady/bomba.png',
  'shady-topo': '/assets/icons/shady/topo-pirata.png',
  'shady-beartrap': '/assets/icons/shady/trampa.png',
  'shady-fist': '/assets/icons/shady/guante-de-hierro.png',
  'shady-heart': '/assets/icons/shady/corazon-con-picos.png',
  'shady-fist-up': '/assets/icons/shady/guante-de-hierro.png',
  'shady-demon-heart': '/assets/icons/shady/corazon-con-picos.png',
};

export function getBioIconUrl(name: BioIconName): string {
  return ICON_PATH_MAP[name];
}

export async function getBioIconDataUrl(name: BioIconName): Promise<string> {
  return ICON_PATH_MAP[name];
}

interface BioIconProps {
  name: BioIconName;
  size?: number;
  className?: string;
  alt?: string;
}

export function BioIcon({
  name,
  size = 28,
  className = '',
  alt = name,
}: BioIconProps) {
  return (
    <img
      src={ICON_PATH_MAP[name]}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`inline-block shrink-0 select-none object-contain ${className}`}
      draggable={false}
    />
  );
}
