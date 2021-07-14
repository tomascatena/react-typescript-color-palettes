import { createStyles } from '@material-ui/core';

const styles = createStyles({
  root: {
    backgroundColor: '#FFF',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '.5rem',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover svg': {
      opacity: 1,
    },
  },
  colors: {
    backgroundColor: '#dae1e4',
    height: '150px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: '#000',
    paddingTop: '.5rem',
    fontSize: '1rem',
    position: 'relative',
  },
  emoji: {
    marginLeft: '.5rem',
    fontSize: '1.5rem',
  },
  miniColorBox: {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '-5px',
  },
  deleteIconContainer: {
    position: 'absolute',
    top: '0',
    right: '0',
    transform: 'translate(50%,-50%)',
    zIndex: 1,
  },
  deleteIcon: {
    color: '#fff',
    backgroundColor: '#eb3d30',
    width: '2.4rem',
    height: '2.4rem',
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0,
    zIndex: 1,
    padding: '.3rem',
    transition: 'all 0.3s ease-in-out',
  },
});

export default styles;
