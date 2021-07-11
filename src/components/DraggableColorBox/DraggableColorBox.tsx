import useStyles from './DraggableColorBoxStyles';

interface DraggableColorBoxProps {
  color: { hex: string; name: string };
}

const DraggableColorBox = ({ color }: DraggableColorBoxProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ backgroundColor: color.hex }}>
      {color.name}
    </div>
  );
};

export default DraggableColorBox;
