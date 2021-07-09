import MiniPalette from '../MiniPalette/MiniPalette';
import { withStyles } from '@material-ui/styles';
import { WithStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
  root: {
    backgroundColor: 'blue',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    width: '70%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '5%',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    color: '#fff',
  },
});

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

interface PaletteListProps extends WithStyles<typeof styles> {
  palettes: ColorPalette[];
}

const PaletteList = ({ classes, palettes }: PaletteListProps): JSX.Element => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
        </nav>

        <div className={classes.palettes}>
          {palettes.map((palette) => {
            return <MiniPalette {...palette} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
