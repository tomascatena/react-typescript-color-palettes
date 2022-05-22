import { WithStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import MiniPaletteStyles from './MiniPaletteStyles';
import React, { FC, MouseEvent, memo } from 'react';

interface MiniPaletteProps extends WithStyles<typeof MiniPaletteStyles> {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
  openDialog: (id: string) => void;
}

export const MiniPalette: FC<MiniPaletteProps> = ({
  classes,
  colors,
  paletteName,
  emoji,
  id,
  openDialog,
}) => {
  const navigate = useNavigate();

  const miniColorBoxes = colors.map(
    ({ color, name }) => (
      <div
        className={classes.miniColorBox}
        style={{ backgroundColor: color }}
        key={name}
      ></div>
    )
  );

  const goToPalette = (e: MouseEvent<HTMLElement>, id: string): void => {
    navigate(`/palette/${id}`);
  };

  const handleDeletePalette = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    openDialog(id);
  };

  return (
    <section
      data-testid='mini-palette'
      className={classes.root}
      onClick={(e) => goToPalette(e, id)}
    >
      <div
        data-testid='delete-palette'
        className={classes.deleteIconContainer}
        onClick={handleDeletePalette}
      >
        <DeleteIcon
          className={classes.deleteIcon}
        />
      </div>

      <div className={classes.colors}>{miniColorBoxes}</div>

      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </section>
  );
};

export default withStyles(MiniPaletteStyles)(memo(MiniPalette));
