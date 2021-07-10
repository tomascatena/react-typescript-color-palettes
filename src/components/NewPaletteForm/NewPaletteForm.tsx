import useStyles from './NewPaletteFormStyles';
import { useState } from 'react';
import clsx from 'clsx';
import chroma from 'chroma-js';

import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';

import { ChromePicker } from 'react-color';

interface NewPaletteFormProps {}

const NewPaletteForm = ({}: NewPaletteFormProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);
  const [currentColor, setCurrentColor] = useState<string>('blue');
  const [colors, setCColors] = useState<string[]>(['blue', 'teal', 'green']);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const createNewColor = () => {
    setCColors([...colors, currentColor]);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <Divider />

        <Typography variant='h4'>Design Your Palette</Typography>

        <Button variant='contained' color='secondary'>
          Clear Palette
        </Button>

        <Button variant='contained' color='primary'>
          Random Color
        </Button>

        <ChromePicker
          color={currentColor}
          onChangeComplete={(newColor) => {
            setCurrentColor(newColor.hex);
          }}
        />

        <Button
          variant='contained'
          color='primary'
          onClick={createNewColor}
          style={{
            backgroundColor: currentColor,
            color:
              chroma(currentColor).luminance() >= 0.3
                ? 'rgba(0, 0, 0, 0.7)'
                : '#fff',
          }}
        >
          Add Color
        </Button>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <ul>
          {colors.map((color) => (
            <li style={{ backgroundColor: color }}>{color}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default NewPaletteForm;
