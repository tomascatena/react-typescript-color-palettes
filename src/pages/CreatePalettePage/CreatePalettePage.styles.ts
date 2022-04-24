import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',

      '& p': {
        fontSize: '1.4rem',
        textAlign: 'center',
        margin: 'auto',
        fontWeight: '100',
      },
    },
    content: {
      flexGrow: 1,
      height: 'calc(100vh - 64px)',
      // padding: theme.spacing(1),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    colorPickerContainer: {
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      width: '85%',

      '& button': {
        marginBottom: '0.8rem',
      },
    },
  })
);

export default useStyles;
