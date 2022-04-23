import { Color } from './CreatePalettePage';

type SetStateString = React.Dispatch<React.SetStateAction<string>>;

export const generateRandomHexColor = (): string => {
  return ('#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')).toLowerCase();
};

export const isRandomColorInNewPalette = (randomHexColor: string, colors: Color[]): boolean => {
  return colors.some((color) => {
    return color.color.toLowerCase() === randomHexColor.toLowerCase();
  });
};

export const pickRandomHexColor = async (
  colors: Color[],
  setNewColorName: SetStateString,
  setCurrentColor: SetStateString
): Promise<void> => {
  let randomHexColor = generateRandomHexColor();

  while (isRandomColorInNewPalette(randomHexColor, colors)) {
    randomHexColor = generateRandomHexColor();
  }

  try {
    const response = await fetch(
      `https://www.thecolorapi.com/id?hex=${randomHexColor.replace('#', '')}`
    );

    const data = await response.json();

    setNewColorName(data.name.value);
  } catch (error) {
    console.log(error);
  }

  setCurrentColor(randomHexColor);
};
