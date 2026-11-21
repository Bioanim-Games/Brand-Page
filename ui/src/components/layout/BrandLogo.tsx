interface BrandLogoProps {
  className?: string;
  alt?: string;
}

export function BrandLogo({
  className = '',
  alt = 'Bioanim Games Logo',
}: BrandLogoProps) {
  return (
    <img
      src="/assets/brand/bioanim-logo.png"
      alt={alt}
      className={`select-none object-contain ${className}`}
      draggable={false}
    />
  );
}
