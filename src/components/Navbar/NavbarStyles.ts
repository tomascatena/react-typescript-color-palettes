import { createStyles } from '@material-ui/core';

const styles = createStyles({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '7vh',
  },
  logo: {
    marginRight: 15,
    padding: '0 13px',
    fontSize: 20,
    backgroundColor: '#eceff1',
    fontFamily: 'Roboto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',

    '& a': {
      textDecoration: 'none',
      color: '#000',
    },
  },
  slider: {
    width: 340,
    margin: '0 10px',
    display: 'inline-block',

    '& .rc-slider-track': {
      backgroundColor: 'transparent',
    },

    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus .rc-slider-handle:hover':
      {
        backgroundColor: 'green',
        outline: 'none',
        border: '2px solid green',
        boxShadow: 'none',
        width: '13px',
        height: '13px',
        marginTop: '-2px',
      },

    '& .rc-slider-rail': {
      height: '8px',
    },
  },
  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem',
  },
  formatChangeMessage: {
    fontSize: '1rem',
  },
});

export default styles;
