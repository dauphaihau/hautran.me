const icons = {
  gitHub: 'mdi:github',
  npm: 'teenyicons:npm-outline',
  linkedIn: 'mdi:linkedin',
  twitter: 'ri:twitter-x-fill',
  portfolio: 'material-symbols:person',
  website: 'solar:planet-2-bold',
  app: 'ic:twotone-phone-iphone',
  dot: 'carbon:dot-mark',
  whiteDot: 'ph:dot-outline-thin',
};

export type IconKey = keyof typeof icons;

function lowerCaseFirstLetter(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function toIcon(key: IconKey): string {
  return icons[lowerCaseFirstLetter(key) as IconKey];
}
