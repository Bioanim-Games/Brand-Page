# Bioanim Games UI — Technical Specification (`specs.md` — v4 Native Transparent PNG Assets)

> [!IMPORTANT]
> **Phase 2 — Spec-Driven Design**: Once you approve this specification, we will persist it to `specs/ui/bioanim_portal_spec.md` and `docs/specs/bioanim_portal_spec.md` and immediately execute **Phase 3 (Implementation & Verification)**.

---

## 1. Native Transparent Brand Logo Contract (`ui/src/components/layout/BrandLogo.tsx`)

- **Source File**: `C:\Users\jmarc\Documents\Bioanim-Games\logo fondo transparente.png`
- **Target Asset Path**: `ui/public/assets/brand/bioanim-logo.png`
- **Deleted Legacy File**: `ui/public/assets/brand/raw-logo.jpg`
- **Component Contract**:
  - `BrandLogo.tsx` renders `<img src="/assets/brand/bioanim-logo.png" alt={alt} className={...} />` directly with zero runtime canvas processing.

---

## 2. Native Transparent PNG Icons Contract (`ui/src/components/ui/BioIcon.tsx`)

- **Deleted Legacy Files**:
  - `ui/public/assets/icons/shiny-fun-icons.jpg`
  - `ui/public/assets/icons/shady-fun-icons.jpg`
- **Strict `.png`-Only Asset Mapping (`ICON_PATH_MAP`)**:

### 2.1 Shiny Fun Icons (`ui/public/assets/icons/shiny/*.png`)

| `BioIconName` | Source File in `shiny fun icons\` | Target URL in `ui/public/` |
| :--- | :--- | :--- |
| `shine-gamepad` | `control consola.png` | `/assets/icons/shiny/control-consola.png` |
| `shine-arcade-pad` | `botonera.png` | `/assets/icons/shiny/botonera.png` |
| `shine-mallet` | `martillo.png` | `/assets/icons/shiny/martillo.png` |
| `shine-hardhat` | `casco construccion lentes.png` | `/assets/icons/shiny/casco-construccion-lentes.png` |
| `shine-fire-helmet` | `Casco bombero.png` | `/assets/icons/shiny/casco-bombero.png` |
| `shine-axe` | `hacha.png` | `/assets/icons/shiny/hacha.png` |
| `shine-pickaxe` | `pico.png` | `/assets/icons/shiny/pico.png` |
| `shine-trophy` | `copa.png` | `/assets/icons/shiny/copa.png` |
| `shine-topo` | `topo feliz.png` | `/assets/icons/shiny/topo-feliz.png` |
| `shine-coins` | `monedas.png` | `/assets/icons/shiny/monedas.png` |
| `shine-chest` | `cofre.png` | `/assets/icons/shiny/cofre.png` |
| `shine-heart` | `corazon.png` | `/assets/icons/shiny/corazon.png` |

### 2.2 Shady Fun Icons (`ui/public/assets/icons/shady/*.png`)

| `BioIconName` | Source File in `shady fun icons\` | Target URL in `ui/public/` |
| :--- | :--- | :--- |
| `shady-gamepad` | `control shady.png` | `/assets/icons/shady/control-shady.png` |
| `shady-cage` | `jaula.png` | `/assets/icons/shady/jaula.png` |
| `shady-grenade` | `granada.png` | `/assets/icons/shady/granada.png` |
| `shady-bat` | `bate.png` | `/assets/icons/shady/bate.png` |
| `shady-spiked-grenade` | `granada.png` | `/assets/icons/shady/granada.png` |
| `shady-pistol` | `pistola.png` | `/assets/icons/shady/pistola.png` |
| `shady-battle-axe` | `hacha con picos.png` | `/assets/icons/shady/hacha-con-picos.png` |
| `shady-dynamite` | `tnt.png` | `/assets/icons/shady/tnt.png` |
| `shady-skull-bomb` | `bomba.png` | `/assets/icons/shady/bomba.png` |
| `shady-topo` | `topo pirata.png` | `/assets/icons/shady/topo-pirata.png` |
| `shady-beartrap` | `trampa.png` | `/assets/icons/shady/trampa.png` |
| `shady-fist` | `guante de hierro.png` | `/assets/icons/shady/guante-de-hierro.png` |
| `shady-heart` | `corazon con picos.png` | `/assets/icons/shady/corazon-con-picos.png` |
| `shady-fist-up` | `guante de hierro.png` | `/assets/icons/shady/guante-de-hierro.png` |
| `shady-demon-heart` | `corazon con picos.png` | `/assets/icons/shady/corazon-con-picos.png` |

### 2.3 Component & Canvas Helper API (`BioIcon.tsx`)
```typescript
export function getBioIconUrl(name: BioIconName): string {
  return ICON_PATH_MAP[name];
}

export async function getBioIconDataUrl(name: BioIconName): Promise<string> {
  return ICON_PATH_MAP[name];
}
```
- `<BioIcon name={name} size={size} />` renders a direct `<img src={ICON_PATH_MAP[name]} />` with zero runtime canvas processing, while keeping `getBioIconDataUrl(name)` compatible with `BioDropArcadeGame.tsx`.

---

## 3. Acceptance Criteria

1. Only `.png` files from `shiny fun icons` and `shady fun icons` are staged in `ui/public/assets/icons/shiny/` and `ui/public/assets/icons/shady/` (zero `.jpg` files in `ui/public/assets/icons/` or `ui/public/assets/brand/`).
2. `ui/public/assets/brand/bioanim-logo.png` is copied directly from `C:\Users\jmarc\Documents\Bioanim-Games\logo fondo transparente.png`.
3. `yarn build` succeeds on the first run and all files in `ui/src/` remain strictly `<= 400` lines.
