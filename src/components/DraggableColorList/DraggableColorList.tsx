import { SortableContainer } from 'react-sortable-hoc';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import DraggableColorBox from '@components/DraggableColorBox/DraggableColorBox';
import DraggableColorListStyles from './DraggableColorList.styles';
import React, { FC } from 'react';

interface ColorListProps extends WithStyles<typeof DraggableColorListStyles> {
  colors: { color: string; name: string }[];
  handleRemoveColorFromPalette: (colorName: string) => void;
}

const ColorList:FC<ColorListProps> = ({ classes, colors, handleRemoveColorFromPalette }) => {
  const DraggableColorBoxes = colors.map((color, index) => (
    <DraggableColorBox
      index={index}
      key={`${color.name}-${color.color}`}
      color={color}
      removeColorFromPalette={() => handleRemoveColorFromPalette(color.name)}
    />
  ));

  return (
    <div
      data-testid='draggable-color-boxes'
      className={classes.root}
    >
      {DraggableColorBoxes}
    </div>
  );
};

export const DraggableColorList = SortableContainer(ColorList);

export default withStyles(DraggableColorListStyles)(DraggableColorList);
