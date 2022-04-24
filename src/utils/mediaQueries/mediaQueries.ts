interface MediaQueries {
  up: (size: ScreenSizesKeys) => string;
  down: (size: ScreenSizesKeys) => string;
}

export const SCREEN_SIZES = {
  xs: '575.98px',
  s: '767.98px',
  m: '991.98px',
  l: '1199.98px',
  xl: '1400px',
} as const;

export type ScreenSizesKeys = keyof typeof SCREEN_SIZES;

const mediaQueries: MediaQueries = {
  up(size: ScreenSizesKeys) {
    return `@media (min-width: ${SCREEN_SIZES[size]})`;
  },

  down(size: ScreenSizesKeys) {
    return `@media (max-width: ${SCREEN_SIZES[size]})`;
  },
};

export default mediaQueries;
