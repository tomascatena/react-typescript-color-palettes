import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { drawerWidth } from '../../pages/CreatePalettePage/CreatePalettePage.styled';
import mediaQueries from '../../utils/mediaQueries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '4rem',
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    navButtons: {
      display: 'flex',

      '& button': {
        marginRight: '1rem',
      },

      '& a': {
        textDecoration: 'none',
      },
    },
    [mediaQueries.down('m')]: {},
    [mediaQueries.down('s')]: {
      navButtons: {
        marginRight: '0',
        fontSize: '0.8rem',
      },
      menuButton: {
        marginRight: '0',
      },
    },
  })
);

export default useStyles;
