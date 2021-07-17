import { createStyles } from '@material-ui/core';
import mediaQueries from '../../utils/mediaQueries';

const styles = createStyles({
  root: {
    display: 'grid',
    gridTemplateRows: '7vh auto 5vh',
  },
  singleColorPalette: {
    minHeight: '88vh',
    height: '100%',
  },
  goBack: {
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    height: '50%',
    width: '20%',
    marginBottom: '-5px',
  },
  goBackButton: {
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
    color: '#fff',
  },
  [mediaQueries.down('m')]: {
    goBack: {
      width: '50% !important',
      height: '6rem !important',
      display: 'inline-block',
    },
  },
  [mediaQueries.down('s')]: {
    goBack: {
      width: '100% !important',
      height: '4rem !important',
      display: 'block',
    },
  },
});

export default styles;
