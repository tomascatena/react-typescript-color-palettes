import ColorBox from '../ColorBox/ColorBox';
import './Palette.css';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import PaletteFooter from '../PaletteFooter/PaletteFooter';
import { withStyles } from '@material-ui/styles';
import { WithStyles, createStyles } from '@material-ui/core';

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

interface PaletteProps extends WithStyles<typeof styles> {
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

export default withStyles(styles)(Palette);
