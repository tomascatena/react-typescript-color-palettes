import { createStyles } from '@material-ui/core';

const styles = createStyles({
  root: {
    backgroundColor: 'blue',
    minHeight: '100vh',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: '2rem',
  },
  container: {
    flex: '0 0 70%',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '2rem',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    justifyItems: 'center',
    width: '100%',
    color: '#fff',
    padding: '1rem 0',

    '& a': {
      color: '#fff',
      textDecoration: 'none',
      alignSelf: 'center',
      border: '1px solid black',
      padding: '.5rem',
      borderRadius: '.4rem',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
  },
});

export default styles;
