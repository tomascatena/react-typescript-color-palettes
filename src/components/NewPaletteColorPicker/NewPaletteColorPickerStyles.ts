import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
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
    },
    colorNameInput: {
      width: '100%',
    },
  })
);

export default useStyles;
