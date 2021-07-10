import { withStyles } from '@material-ui/styles';
import { WithStyles, createStyles } from '@material-ui/core';
import { useState, useEffect } from 'react';
import ColorBox from '../ColorBox/ColorBox';

const styles = createStyles({
  palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  paletteColors: {
    height: '90%',
  },
});

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

interface SingleColorPaletteProps extends WithStyles<typeof styles> {
  colorPalette: ColorPaletteWithShades;
  colorId: string;
}

type ColorShades = {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  rgba: string;
}[];

const SingleColorPalette = ({
  classes,
  colorPalette,
  colorId,
}: SingleColorPaletteProps) => {
  const [shades, setShades] = useState<ColorShades>([]);

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
      colorShades.push(
        ...allColors[key].filter(
          (color: { [key: string]: string }): boolean =>
            color.id === colorToFilterBy
        )
      );
    }

    return colorShades.slice(1);
  };

  const colorBoxes = shades.map((color) => {
    return (
      <ColorBox
        key={`${color.name}-${color.hex}`}
        background={color.hex}
        name={color.name}
        id={color.id}
        showMoreLink={false}
      />
    );
  });

  return (
    <div className={classes.palette}>
      <h1>Single Color Palette</h1>
      <div className={classes.paletteColors}>{colorBoxes}</div>
    </div>
  );
};

export default withStyles(styles)(SingleColorPalette);
