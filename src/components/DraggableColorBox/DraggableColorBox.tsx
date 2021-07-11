import DraggableColorBoxStyles from './DraggableColorBoxStyles';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';

interface DraggableColorBoxProps
  extends WithStyles<typeof DraggableColorBoxStyles> {
  color: { color: string; name: string };
  removeColorFromPalette: (colorName: string) => void;
}

const DraggableColorBox = ({
  classes,
  color,
  removeColorFromPalette,
}: DraggableColorBoxProps): JSX.Element => {
  const handleDeleteColor = (): void => {
    removeColorFromPalette(color.name);
  };

  return (
    <div className={classes.root} style={{ backgroundColor: color.color }}>
      <div className={classes.boxContent}>
        <span>{color.name}</span>
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

export default withStyles(DraggableColorBoxStyles)(DraggableColorBox);
