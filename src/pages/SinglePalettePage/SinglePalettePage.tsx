import React, { useState, useEffect, FC } from 'react';

import ColorBox from '@components/ColorBox/ColorBox';
import Navbar from '@components/Navbar/Navbar';
import PaletteFooter from '@components/PaletteFooter/PaletteFooter';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import SingleColorPaletteStyles from './SinglePalettePage.styled';

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

enum ColorFormats {
  hex = 'hex',
  rgb = 'rgb',
  rgba = 'rgba',
}

interface SingleColorPaletteProps extends WithStyles<typeof SingleColorPaletteStyles> {
  colorPalette: ColorPaletteWithShades;
  colorId: string;
}

type SingleColor = {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  rgba: string;
  level: number;
};

type ColorShades = SingleColor[];

const SingleColorPalette: FC<SingleColorPaletteProps> = ({ classes, colorPalette, colorId }) => {
  const [shades, setShades] = useState<ColorShades>([]);
  const [colorFormat, setColorFormat] = useState<ColorFormats>(ColorFormats.hex);

  const gatherShades = (palette: ColorPaletteWithShades, colorToFilterBy: string): ColorShades => {
    const colorShades: ColorShades = [];
    const allColors = palette.colors;

    for (const key in allColors) {
      const singleColor = allColors[key].find((color) => color.id === colorToFilterBy);

      colorShades.push(singleColor as SingleColor);
    }

    return colorShades.slice(1);
  };

  useEffect(() => {
    setShades(gatherShades(colorPalette, colorId));
  }, [colorPalette, colorId]);

  const colorBoxes = shades.map((color) => {
    return (
      <ColorBox
        key={`${color.name}-${color.hex}`}
        background={color[colorFormat]}
        name={color.name}
        id={color.id}
        showMoreLink={false}
      />
    );
  });

  return (
    <div className={classes.root}>
      <Navbar
        colorFormat={colorFormat}
        setColorFormat={setColorFormat}
      />

      <div
        className={classes.singleColorPalette}
        style={{ height: `calc(${document.body.scrollHeight} - 5vh)` }}
      >
        {colorBoxes}
        <div
          className={classes.goBack}
          style={{ background: '#000' }}
        >
          <Link
            className={classes.goBackButton}
            to={`/palette/${colorPalette.id}`}
          >
            Go Back
          </Link>
        </div>
      </div>

      <PaletteFooter colorPalette={colorPalette} />
    </div>
  );
};

export default withStyles(SingleColorPaletteStyles)(SingleColorPalette);
