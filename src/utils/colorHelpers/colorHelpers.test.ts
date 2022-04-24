import { generatePalette, generateScale, getRange } from './colorHelpers';
import { mockGeneratedPalette } from './mockGeneratedPalette';
import seedPalettes from '@data/seedPalettes';

describe('colorHelpers', () => {
  describe('getRange', () => {
    test.each([
      [['#b8b8b8', '#fff', '#fff'], '#'],
      [['#b8b8b8', '#fff', '#fff'], '#fff'],
      [['#000000', '#000', '#fff'], '#000'],
      [['#a8a8a8', '#eee', '#fff'], '#eee'],
    ])('should return %s when the input is %s', (expectedResult, inputHexColor) => {
      expect(getRange(inputHexColor)).toEqual(expectedResult);
    });
  });

  describe('generateScale', () => {
    test.each([
      [['#b8b8b8', '#c7c7c7', '#d7d7d7', '#e7e7e7', '#f7f7f7', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'], '#', 10],
      [['#b8b8b8', '#c7c7c7', '#d7d7d7', '#e7e7e7', '#f7f7f7', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'], '#fff', 10],
      [['#000000', '#000000', '#000000', '#000000', '#000000', '#1e1e1e', '#4e4e4e', '#858585', '#c0c0c0', '#ffffff'], '#000', 10],
      [['#989898', '#a7a7a7', '#b6b6b6', '#c5c5c5', '#d5d5d5', '#e1e1e1', '#e8e8e8', '#f0f0f0', '#f7f7f7', '#ffffff'], '#ddd', 10],
      [['#989898', '#b3b3b3', '#cfcfcf', '#e4e4e4', '#f1f1f1', '#ffffff'], '#ddd', 6],
    ])('should return %s when the input is %s',
      (expectedResult, inputHexColor, numberOfColorsToGenerate) => {
        const generatedScale = generateScale(inputHexColor, numberOfColorsToGenerate);

        expect(generatedScale).toEqual(expectedResult);
        expect(generatedScale.length).toBe(numberOfColorsToGenerate);
      });
  });

  describe('generatePalette', () => {
    test('should generate the palette correctly', () => {
      expect(generatePalette(seedPalettes[0])).toEqual(mockGeneratedPalette);
    });
  });
});
