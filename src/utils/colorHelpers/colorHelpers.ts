import chroma from 'chroma-js';

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

interface ColorPaletteWithShades {
  paletteName: string;
  id: string;
  emoji: string;
  colors: {
    [key: number]: {
      id: string;
      name: string;
      hex: string;
      rgb: string;
      rgba: string;
      level: number;
    }[];
  };
}

const levels: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const isValidHexColor = (hexColor: string) => {
  return hexColor.match(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi);
};

export const getRange = (hexColor: string): string[] => {
  const end = '#fff';

  if (isValidHexColor(hexColor)) {
    return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
  }

  return [chroma(end).darken(1.4).hex(), end, end];
};

export const generateScale = (hexColor: string, numberOfColorsToGenerate = 10): string[] => {
  if (isValidHexColor(hexColor)) {
    return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColorsToGenerate);
  }

  return chroma.scale(getRange('#fff')).mode('lab').colors(numberOfColorsToGenerate);
};

export const generatePalette = (starterPalette: ColorPalette): ColorPaletteWithShades => {
  const newPalette: ColorPaletteWithShades = {
    ...starterPalette,
    colors: {},
  };

  levels.forEach((level: number): void => {
    newPalette.colors[level] = [];
  });

  starterPalette.colors.forEach((colorObj: { name: string; color: string }): void => {
    const { name, color } = colorObj;
    const scale: string[] = generateScale(color, 10).reverse();

    for (const i in scale) {
      newPalette.colors[levels[i]].push({
        id: name.toLowerCase().replace(/ /g, '-'),
        name: `${name} ${levels[i]}`,
        level: levels[i],
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1.0)'),
      });
    }
  });

  return newPalette;
};
