import DraggableColorListStyles from './DraggableColorListStyles';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from '../DraggableColorBox/DraggableColorBox';
import React from 'react';

interface DraggableColorListProps extends WithStyles<typeof DraggableColorListStyles> {
  colors: { color: string; name: string }[];
  handleRemoveColorFromPalette: (colorName: string) => void;
}

const DraggableColorList = SortableContainer(
  ({ classes, colors, handleRemoveColorFromPalette }: DraggableColorListProps): JSX.Element => {
    const DraggableColorBoxes = colors.map((color, index) => (
      <DraggableColorBox
        index={index}
        key={`${color.name}-${color.color}`}
        color={color}
        removeColorFromPalette={() => handleRemoveColorFromPalette(color.name)}
      />
    ));

    return <div className={classes.root}>{DraggableColorBoxes}</div>;
  }
);

export default withStyles(DraggableColorListStyles)(DraggableColorList);
