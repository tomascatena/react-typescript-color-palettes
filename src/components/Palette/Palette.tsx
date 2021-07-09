import ColorBox from '../ColorBox/ColorBox';
import './Palette.css';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';

enum ColorFormats {
  hex = 'hex',
  rgb = 'rgb',
  rgba = 'rgba',
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
    }[];
  };
}

interface PaletteProps {
  colorPalette: ColorPaletteWithShades;
}

const Palette = ({ colorPalette }: PaletteProps): JSX.Element => {
  const [level, setLevel] = useState<number>(500);
  const [colorFormat, setColorFormat] = useState<ColorFormats>(
    ColorFormats.hex
  );

  const changeLevel = (newLevel: number): void => {
    setLevel(newLevel);
  };

  return (
    <div className='Palette'>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        setColorFormat={setColorFormat}
        colorFormat={colorFormat}
      />

      <div className='PaletteColors'>
        {colorPalette.colors[level].map(
          (colorObj): JSX.Element => (
            <ColorBox
              key={`${colorObj.name}-${colorObj.hex}`}
              background={colorObj[colorFormat]}
              name={colorObj.name}
            />
          )
        )}
      </div>

      <footer className='paletteFooter'>
        {colorPalette.paletteName}
        <span className='emoji'>{colorPalette.emoji}</span>
      </footer>
    </div>
  );
};

export default Palette;
