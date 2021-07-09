import { withStyles } from '@material-ui/styles';
import { WithStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
  root: {
    backgroundColor: '#FFF',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '.5rem',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  colors: {
    backgroundColor: '#dae1e4',
    height: '150px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: '#000',
    paddingTop: '.5rem',
    fontSize: '1rem',
    position: 'relative',
  },
  emoji: {
    marginLeft: '.5rem',
    fontSize: '1.5rem',
  },
  miniColorBox: {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '-3.5px',
  },
});

interface MiniPaletteProps extends WithStyles<typeof styles> {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

const MiniPalette = ({
  classes,
  colors,
  paletteName,
  emoji,
  id,
}: MiniPaletteProps): JSX.Element => {
  const miniColorBoxes = colors.map(({ color, name }): JSX.Element => {
    return (
      <div
        className={classes.miniColorBox}
        style={{ backgroundColor: color }}
        key={name}
      ></div>
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.colors}>{miniColorBoxes}</div>

      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

export default withStyles(styles)(MiniPalette);
