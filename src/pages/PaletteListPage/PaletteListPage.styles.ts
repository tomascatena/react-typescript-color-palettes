import { createStyles } from '@material-ui/core';
import bg from './Confetti-Doodles-Background.svg';
import mediaQueries from '../../utils/mediaQueries';

const styles = createStyles({
  '@global': {
    '.fade-enter': {
      opacity: '0',
    },
    '.fade-enter-active': {
      opacity: '1',
      transition: 'opacity 300ms ease-in',
    },
    '.fade-exit': {
      opacity: '1',
    },
    '.fade-exit-active': {
      opacity: '0',
      transition: 'opacity 300ms ease-in',
    },
  },
  root: {
    // background by SVGBackgrounds.com
    backgroundColor: 'blue',
    backgroundImage: `url(${bg})`,
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
      alignSelf: 'center',
      fontSize: '1rem',
    },
  },
  title: {
    fontSize: '2rem',
  },
  [mediaQueries.up('xl')]: {
    container: {
      flex: '0 0 50%',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    },
  },
  [mediaQueries.down('m')]: {
    palettes: {
      boxSizing: 'border-box',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: '2rem',
    },
  },
  [mediaQueries.down('s')]: {
    palettes: {
      boxSizing: 'border-box',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gridGap: '2rem',
    },
  },
});

export default styles;
