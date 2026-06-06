export const icons = {
  gitHub: 'mdi:github',
  npm: 'teenyicons:npm-outline',
  linkedIn: 'mdi:linkedin',
  twitter: 'ri:twitter-x-fill',
  portfolio: 'material-symbols:person',
  website: 'solar:planet-2-bold',
  app: 'ic:twotone-phone-iphone',
  dot: 'carbon:dot-mark',
  whiteDot: 'ph:dot-outline-thin',
  email: 'lucide:mail',
  api: 'gravity-ui:abbr-api',
} as const;

export type IconKey = keyof typeof icons;

export const defaultIconSize = {
  gitHub: 'md',
  npm: 'md',
  linkedIn: 'md',
  twitter: 'md',
  portfolio: 'md',
  website: 'md',
  app: 'md',
  dot: 'sm',
  whiteDot: 'xl',
  email: 'md',
  api: 'lg',
} as const satisfies Record<IconKey, 'sm' | 'md' | 'lg' | 'xl'>;

export function isIconKey(value: string): value is IconKey {
  return value in icons;
}

function normalizeIconKey(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

export function toIconKey(value: string): IconKey | null {
  const normalizedValue = normalizeIconKey(value);

  return isIconKey(normalizedValue) ? normalizedValue : null;
}
