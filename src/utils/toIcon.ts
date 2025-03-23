const icons = {
  gitHub: 'mdi:github',
  linkedIn: 'mdi:linkedin',
  twitter: 'ri:twitter-x-fill',
  portfolio: 'material-symbols:person',
  website: 'solar:planet-2-bold',
  app: 'ic:twotone-phone-iphone',
  dot: 'carbon:dot-mark',
  whiteDot: 'ph:dot-outline-thin',
};

export type IconKey = keyof typeof icons

function lowerCaseFirstLetter(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export function toIcon(s: IconKey) {
  return icons[lowerCaseFirstLetter(s) as IconKey];
}
