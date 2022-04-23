import ColorBox from '../../components/ColorBox/ColorBox';
import './PalettePage.styled.ts';
import React, { useState, FC } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PaletteFooter from '../../components/PaletteFooter/PaletteFooter';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import PaletteStyles from './PalettePage.styled';

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

const Palette: FC<PaletteProps> = ({ classes, colorPalette }) => {
  const [level, setLevel] = useState<number>(500);
  const [colorFormat, setColorFormat] = useState<ColorFormats>(ColorFormats.hex);

  const changeLevel = (newLevel: number): void => {
    setLevel(newLevel);
  };

  return (
    <div className={classes.root}>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        setColorFormat={setColorFormat}
        colorFormat={colorFormat}
      />

      <div
        className={classes.paletteColors}
        style={{ height: `calc(${document.body.scrollHeight} - 5vh)` }}
      >
        {colorPalette.colors[level].map(
          (colorObj, index): JSX.Element => (
            <ColorBox
              key={`${index}-${colorObj.name}-${colorObj.id}`}
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
