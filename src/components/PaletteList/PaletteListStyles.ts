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
    width: '100%',
    color: '#fff',
    padding: '1rem 0',
  },
});

export default styles;
