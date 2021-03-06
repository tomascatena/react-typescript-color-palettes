import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PaletteFooterStyles from './PaletteFooter.styles';
import React, { FC } from 'react';

interface ColorPalette {
  paletteName: string;
  emoji: string;
}

interface PaletteFooterProps extends WithStyles<typeof PaletteFooterStyles> {
  colorPalette: ColorPalette;
}

export const PaletteFooter: FC<PaletteFooterProps> = ({ classes, colorPalette }) => {
  return (
    <footer className={classes.paletteFooter}>
      {colorPalette.paletteName}

      <span className={classes.emoji}>{colorPalette.emoji}</span>
    </footer>
  );
};

export default withStyles(PaletteFooterStyles)(PaletteFooter);
