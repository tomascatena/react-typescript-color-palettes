import { Emoji } from 'emoji-mart/dist-es';
import { Link, useNavigate } from 'react-router-dom';
import { drawerWidth } from '@pages/CreatePalettePage/CreatePalettePage.styled';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PaletteMetaForm from '@components/PaletteMetaForm/PaletteMetaForm';
import React, { FC, useEffect, useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import useStyles from './PaletteFormNavStyles';

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

interface PaletteFormNavProps {
  open: boolean;
  handleDrawerOpen: () => void;
  savePalette: (newPalette: ColorPalette) => void;
  colors: { name: string; color: string }[];
}

const PaletteFormNav: FC<PaletteFormNavProps> = ({
  open,
  handleDrawerOpen,
  savePalette,
  colors,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [newPaletteName, setNewPaletteName] = useState<string>('');

  const preFetchEmojisSheet = async () => {
    if (Emoji.defaultProps?.backgroundImageFn) {
      const url = Emoji.defaultProps?.backgroundImageFn('apple', 32);

      await fetch(url);
    }
  };

  useEffect(() => {
    preFetchEmojisSheet();
  }, []);

  const handlePaletteNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPaletteName(event.target.value);
  };

  const handleCreateNewPalette = (emoji: string): void => {
    const newPalette: ColorPalette = {
      paletteName: newPaletteName,
      emoji,
      id: newPaletteName.toLowerCase().replaceAll(' ', '-'),
      colors,
    };

    savePalette(newPalette);

    navigate('/');
  };

  return (
    <div className={classes.root}>
      <AppBar
        color='default'
        position='fixed'
        elevation={0}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
        }}
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
            <AddCircleIcon />
          </IconButton>

          <Typography
            variant='h6'
            noWrap
          >
            Create Palette
          </Typography>
        </Toolbar>

        <div className={classes.navButtons}>
          <Link to='/'>
            <Button variant='contained'>Go Back</Button>
          </Link>

          <PaletteMetaForm
            newPaletteName={newPaletteName}
            handlePaletteNameChange={handlePaletteNameChange}
            handleCreateNewPalette={handleCreateNewPalette}
          />
        </div>
      </AppBar>
    </div>
  );
};

export default PaletteFormNav;
