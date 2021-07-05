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

  const changeFormat = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setColorFormat(event.target.value as ColorFormats);
  };

  return (
    <div className='Palette'>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        handleFormatChange={changeFormat}
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

      {/* Footer */}
    </div>
  );
};

export default Palette;
