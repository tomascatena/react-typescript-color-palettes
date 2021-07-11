import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '20%',
      height: '25%',
      margin: '0 auto',
      display: 'inline-block',
      position: 'relative',
      cursor: 'pointer',
      marginBottom: '-3.5px',
    },
  })
);

export default useStyles;
