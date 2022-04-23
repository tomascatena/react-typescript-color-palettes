import { Color } from './CreatePalettePage';

type SetStateString = React.Dispatch<React.SetStateAction<string>>;

export const pickRandomHexColor = async (
  colors: Color[],
  setNewColorName: SetStateString,
  setCurrentColor: SetStateString
): Promise<void> => {
  const isRandomColorInNewPalette = (randomHexColor: string): boolean => {
    return colors.some((color) => {
      return color.color.toLowerCase() === randomHexColor.toLowerCase();
    });
  };

  const generateRandomHexColor = (): string => {
    return ('#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')).toLowerCase();
  };

  let randomHexColor = generateRandomHexColor();

  while (isRandomColorInNewPalette(randomHexColor)) {
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
