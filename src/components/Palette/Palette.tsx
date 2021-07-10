import ColorBox from '../ColorBox/ColorBox';
import './PaletteStyles.ts';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import PaletteFooter from '../PaletteFooter/PaletteFooter';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import PaletteStyles from './PaletteStyles';

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

interface PaletteProps extends WithStyles<typeof PaletteStyles> {
  colorPalette: ColorPaletteWithShades;
}

const Palette = ({ classes, colorPalette }: PaletteProps): JSX.Element => {
  const [level, setLevel] = useState<number>(500);
  const [colorFormat, setColorFormat] = useState<ColorFormats>(
    ColorFormats.hex
  );

  const changeLevel = (newLevel: number): void => {
    setLevel(newLevel);
  };

  return (
    <div className={classes.palette}>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        setColorFormat={setColorFormat}
        colorFormat={colorFormat}
      />

      <div className={classes.paletteColors}>
        {colorPalette.colors[level].map(
          (colorObj): JSX.Element => (
            <ColorBox
              background={colorObj[colorFormat]}
              name={colorObj.name}
              id={colorObj.id}
              showMoreLink
            />
          )
        )}
      </div>

      <PaletteFooter colorPalette={colorPalette} />
    </div>
  );
};

export default withStyles(PaletteStyles)(Palette);
