import useStyles from './DraggableColorBoxStyles';
import { useTheme } from '@material-ui/core/styles';

interface DraggableColorBoxProps {
  color: string;
}

const DraggableColorBox = ({ color }: DraggableColorBoxProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      {color}
    </div>
  );
};

export default DraggableColorBox;
