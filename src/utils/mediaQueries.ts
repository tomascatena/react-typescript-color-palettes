interface MediaQueries {
  up: (size: string) => string;
  down: (size: string) => string;
}

const mediaQueries: MediaQueries = {
  up(size: string) {
    const sizes: { [key: string]: string } = {
      xs: '575.98px',
      s: '767.98px',
      m: '991.98px',
      l: '1199.98px',
    };

    return `@media (min-width: ${sizes[size]})`;
  },

  down(size: string) {
    const sizes: { [key: string]: string } = {
      xs: '575.98px',
      s: '767.98px',
      m: '991.98px',
      l: '1199.98px',
    };

    return `@media (max-width: ${sizes[size]})`;
  },
};

export default mediaQueries;
