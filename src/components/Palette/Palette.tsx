import ColorBox from '../ColorBox/ColorBox';
import './Palette.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';
import { number } from 'yargs';

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
  const [level, setLevel]: [number, (newLevel: number) => void] = useState(500);

  const changeLevel = (newLevel: number): void => {
    setLevel(newLevel);
  };

  return (
    <div className='Palette'>
      {/* Navbar */}
      <Slider
        defaultValue={level}
        min={100}
        max={900}
        step={100}
        onAfterChange={changeLevel}
      />

      <div className='PaletteColors'>
        {colorPalette.colors[level].map(
          ({ hex, name }): JSX.Element => (
            <ColorBox key={`${name}-${hex}`} background={hex} name={name} />
          )
        )}
      </div>

      {/* Footer */}
    </div>
  );
};

export default Palette;
