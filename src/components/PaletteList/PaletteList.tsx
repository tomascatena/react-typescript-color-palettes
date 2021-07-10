import MiniPalette from '../MiniPalette/MiniPalette';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import PaletteListStyles from './PaletteListStyles';
import { Link } from 'react-router-dom';

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

interface PaletteListProps extends WithStyles<typeof PaletteListStyles> {
  palettes: ColorPalette[];
}

const PaletteList = ({ classes, palettes }: PaletteListProps): JSX.Element => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to={`/palette/new`}>Create Palette</Link>
        </nav>

        <div className={classes.palettes}>
          {palettes.map((palette) => {
            return <MiniPalette key={palette.id} {...palette} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default withStyles(PaletteListStyles)(PaletteList);
