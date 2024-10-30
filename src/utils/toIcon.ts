const icons = {
  gitHub: 'mdi:github',
  linkedIn: 'mdi:linkedin',
  twitter: 'mdi:twitter',
  portfolio: 'material-symbols:person',
  website: 'solar:planet-2-bold',
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
