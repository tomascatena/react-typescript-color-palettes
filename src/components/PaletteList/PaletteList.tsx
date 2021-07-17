import MiniPalette from '../MiniPalette/MiniPalette';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import PaletteListStyles from './PaletteListStyles';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

interface PaletteListProps extends WithStyles<typeof PaletteListStyles> {
  palettes: ColorPalette[];
  deletePalette: (id: string) => void;
}

const PaletteList = ({
  classes,
  palettes,
  deletePalette,
}: PaletteListProps): JSX.Element => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.title}>React Colors</h1>

          <Link to={`/palette/new`}>Create Palette</Link>
        </nav>

        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => {
            return (
              <CSSTransition key={palette.id} classNames='fade' timeout={300}>
                <MiniPalette
                  key={palette.id}
                  {...palette}
                  deletePalette={deletePalette}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default withStyles(PaletteListStyles)(PaletteList);
