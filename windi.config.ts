import { defineConfig } from 'windicss/helpers';
import AspectRatio from 'windicss/plugin/aspect-ratio';

export default defineConfig({
  darkMode: 'media',

  plugins: [
    AspectRatio,
    // ...
  ],
});
