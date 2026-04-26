import dauphaihauConfig from '@dauphaihau/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...(await dauphaihauConfig()),
  {
    rules: {
      'vue/multi-word-component-names': ['warn', {
        ignores: ['Profile', 'Background', 'Accomplish'],
      }],
    },
  },
]);
