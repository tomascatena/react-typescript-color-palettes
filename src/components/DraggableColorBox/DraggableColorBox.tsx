import useStyles from './DraggableColorBoxStyles';

interface DraggableColorBoxProps {
  color: { color: string; name: string };
}

const DraggableColorBox = ({ color }: DraggableColorBoxProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ backgroundColor: color.color }}>
      {color.name}
    </div>
  );
};

export default DraggableColorBox;
