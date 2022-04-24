import mediaQueries, { ScreenSizesKeys } from './mediaQueries';

describe('mediaQueries', () => {
  describe('up', () => {
    test.each([
      ['@media (min-width: 575.98px)', 'xs'],
      ['@media (min-width: 767.98px)', 's'],
      ['@media (min-width: 991.98px)', 'm'],
      ['@media (min-width: 1199.98px)', 'l'],
      ['@media (min-width: 1400px)', 'xl'],
    ])('should return %s when called with size %s', (expectedResult, size) => {
      expect(mediaQueries.up(size as ScreenSizesKeys)).toBe(expectedResult);
    });
  });

  describe('down', () => {
    test.each([
      ['@media (max-width: 575.98px)', 'xs'],
      ['@media (max-width: 767.98px)', 's'],
      ['@media (max-width: 991.98px)', 'm'],
      ['@media (max-width: 1199.98px)', 'l'],
      ['@media (max-width: 1400px)', 'xl'],
    ])('should return %s when called with size %s', (expectedResult, size) => {
      expect(mediaQueries.down(size as ScreenSizesKeys)).toBe(expectedResult);
    });
  });
});
