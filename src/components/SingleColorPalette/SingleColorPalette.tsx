import { withStyles } from '@material-ui/styles';
import { WithStyles, createStyles } from '@material-ui/core';
import { useState, useEffect } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import Navbar from '../Navbar/Navbar';
import PaletteFooter from '../PaletteFooter/PaletteFooter';
import { Link } from 'react-router-dom';

const styles = createStyles({
  root: {
    minHeight: '100vh',
    height: '100vh',
    overflow: 'hidden',
  },
  colorBox: {},
  singleColorPalette: {
    height: '90%',
  },
  goBack: {
    display: 'inline-block',
    cursor: 'pointer',
    position: 'absolute',
    height: '45%',
    width: '20%',
  },
  goBackButton: {
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
    color: '#fff',
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
      level: number;
    }[];
  };
}

enum ColorFormats {
  hex = 'hex',
  rgb = 'rgb',
  rgba = 'rgba',
}

interface SingleColorPaletteProps extends WithStyles<typeof styles> {
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

export default withStyles(styles)(SingleColorPalette);
