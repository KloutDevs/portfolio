// Raw SVG markup of every icon in src/assets/icons, keyed like "iconsax/sms" or "brands/github".
const files = import.meta.glob('../assets/icons/**/*.svg', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export function getIconSvg(name: string): string {
  const raw = files[`../assets/icons/${name}.svg`];
  if (!raw) throw new Error(`Icon "${name}" not found in src/assets/icons`);
  return raw;
}
