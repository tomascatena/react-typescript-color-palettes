import { createStyles } from '@material-ui/core/styles';
import chroma from 'chroma-js';

interface Props {
  color: { color: string; name: string };
}

const styles = createStyles({
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-5px',

    '&:hover svg': {
      color: (props: Props) =>
        chroma(props.color.color).luminance() <= 0.1
          ? 'rgba(255, 255, 255, 1)'
          : 'rgba(0, 0, 0, 1)',
      transform: 'scale(1.3)',
    },
  },
  boxContent: {
    position: 'absolute',
    padding: '10px',
    width: '100%',
    left: 0,
    bottom: 0,
    color: (props: Props) =>
      chroma(props.color.color).luminance() <= 0.1
        ? '#fff'
        : 'rgba(0, 0, 0, 1)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out',
    color: (props: Props) =>
      chroma(props.color.color).luminance() <= 0.1
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(0, 0, 0, 0.5)',
  },
  colorName: {
    fontSize: '.9rem',
  },
});

export default styles;
