import { withStyles } from '@material-ui/styles';
import { WithStyles, createStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
    backgroundColor: 'grey',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: '#000',
    paddingTop: '.5rem',
    fontSize: '1rem',
    position: 'relative',
  },
  title: {
    display: 'flex',
  },
  emoji: {
    marginLeft: '.5rem',
    fontSize: '1.5rem',
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
  return (
    <div className={classes.root}>
      <div className={classes.colors}>
        {colors.map((color) => (
          <span>{color.name}</span>
        ))}
      </div>

      <Link to={`/palette/${id}`}>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </Link>
    </div>
  );
};

export default withStyles(styles)(MiniPalette);
