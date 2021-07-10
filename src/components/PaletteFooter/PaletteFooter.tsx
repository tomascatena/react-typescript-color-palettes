import { withStyles } from '@material-ui/styles';
import { WithStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
  paletteFooter: {
    backgroundColor: '#fff',
    height: '5vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: 'bold',

    '& span': {
      margin: 'auto 1rem',
    },
  },
});

interface ColorPalette {
  paletteName: string;
  emoji: string;
}

interface PaletteFooterProps extends WithStyles<typeof styles> {
  colorPalette: ColorPalette;
}

const PaletteFooter = ({ classes, colorPalette }: PaletteFooterProps) => {
  return (
    <footer className={classes.paletteFooter}>
      {colorPalette.paletteName}
      <span className='emoji'>{colorPalette.emoji}</span>
    </footer>
  );
};

export default withStyles(styles)(PaletteFooter);
