import { SortableElement } from 'react-sortable-hoc';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DraggableColorBoxStyles from './DraggableColorBox.styles';
import React, { FC } from 'react';

interface ColorBoxProps extends WithStyles<typeof DraggableColorBoxStyles> {
  color: { color: string; name: string };
  removeColorFromPalette: (colorName: string) => void;
}

const ColorBox:FC<ColorBoxProps> = ({ classes, color, removeColorFromPalette }) => {
  const handleDeleteColor = (): void => {
    removeColorFromPalette(color.name);
  };

  return (
    <div
      className={classes.root}
      style={{ backgroundColor: color.color }}
    >
      <div className={classes.boxContent}>
        <span className={classes.colorName}>{color.name}</span>

        <span className={classes.deleteIcon}>
          <DeleteForeverOutlinedIcon
            className={classes.deleteIcon}
            onClick={handleDeleteColor}
          />
        </span>
      </div>
    </div>
  );
};

export const DraggableColorBox = SortableElement(ColorBox);

export default withStyles(DraggableColorBoxStyles)(DraggableColorBox);
