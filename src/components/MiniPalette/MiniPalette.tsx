import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import MiniPaletteStyles from './MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

interface MiniPaletteProps extends WithStyles<typeof MiniPaletteStyles> {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
  openDialog: (id: string) => void;
}

const MiniPalette = React.memo(
  ({
    classes,
    colors,
    paletteName,
    emoji,
    id,
    openDialog,
  }: MiniPaletteProps): JSX.Element => {
    const history = useHistory();

    const miniColorBoxes = colors.map(({ color, name }): JSX.Element => {
      return (
        <div
          className={classes.miniColorBox}
          style={{ backgroundColor: color }}
          key={name}
        ></div>
      );
    });

    const goToPalette = (e: MouseEvent<HTMLDivElement>, id: string): void => {
      history.push(`/palette/${id}`);
    };

    const handleDeletePalette = (e: MouseEvent<HTMLDivElement>): void => {
      e.stopPropagation();
      openDialog(id);
    };

    return (
      <div className={classes.root} onClick={(e) => goToPalette(e, id)}>
        <div
          className={classes.deleteIconContainer}
          onClick={handleDeletePalette}
        >
          <DeleteIcon className={classes.deleteIcon} />
        </div>
        <div className={classes.colors}>{miniColorBoxes}</div>

        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
);

export default withStyles(MiniPaletteStyles)(MiniPalette);
