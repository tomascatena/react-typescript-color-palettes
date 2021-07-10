import { createStyles } from '@material-ui/core';

const styles = createStyles({
  root: {
    minHeight: '100vh',
    height: '100vh',
    overflow: 'hidden',
  },
  singleColorPalette: {
    height: '90%',
  },
  goBack: {
    display: 'inline-block',
    cursor: 'pointer',
    position: 'absolute',
    height: '45%',
    width: '20%',
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
});

export default styles;
