import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    colorPicker: {
      width: '100% !important',
      margin: '.8rem auto',
      fontSize: '1rem',
    },
    addColorButton: {
      marginTop: '1rem',
      width: '100%',

      '&:disabled': {
        cursor: 'not-allowed',
        pointerEvents: 'all !important',
        backgroundColor: '#aaa !important'
      }
    },
    colorNameInput: {
      width: '100%',
    },
  })
);

export default useStyles;
