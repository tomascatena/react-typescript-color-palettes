import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import { useState, useEffect } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import Navbar from '../Navbar/Navbar';
import PaletteFooter from '../PaletteFooter/PaletteFooter';
import { Link } from 'react-router-dom';
import SingleColorPaletteStyles from './SingleColorPaletteStyles';

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

interface SingleColorPaletteProps
  extends WithStyles<typeof SingleColorPaletteStyles> {
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

const SingleColorPalette = ({
  classes,
  colorPalette,
  colorId,
}: SingleColorPaletteProps) => {
  const [shades, setShades] = useState<ColorShades>([]);
  const [colorFormat, setColorFormat] = useState<ColorFormats>(
    ColorFormats.hex
  );

  useEffect(() => {
    setShades(gatherShades(colorPalette, colorId));
  }, [colorPalette, colorId]);

  const gatherShades = (
    palette: ColorPaletteWithShades,
    colorToFilterBy: string
  ): ColorShades => {
    let colorShades: ColorShades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      let singleColor = allColors[key].find(
        (color) => color.id === colorToFilterBy
      );

      colorShades.push(singleColor as SingleColor);
    }

    return colorShades.slice(1);
  };

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
      <Navbar colorFormat={colorFormat} setColorFormat={setColorFormat} />

      <div className={classes.singleColorPalette}>
        {colorBoxes}
        <div className={classes.goBack} style={{ background: '#000' }}>
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
