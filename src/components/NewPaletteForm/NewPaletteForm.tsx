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
import DraggableColorBox from '../DraggableColorBox/DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { ChromePicker } from 'react-color';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

interface NewPaletteFormProps {
  savePalette: (newPlaette: ColorPalette) => void;
  palettes: ColorPalette[];
}

const NewPaletteForm = ({
  savePalette,
  palettes,
}: NewPaletteFormProps): JSX.Element => {
  const history = useHistory();

  const classes = useStyles();

  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);
  const [currentColor, setCurrentColor] = useState<string>('blue');
  const [colors, setColors] = useState<{ color: string; name: string }[]>([]);
  const [newColorName, setNewColorName] = useState<string>('');
  const [newPaletteName, setNewPaletteName] = useState<string>('');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const createNewColor = () => {
    const newColor = { color: currentColor, name: newColorName };
    setColors([...colors, newColor]);
  };

  const handleColorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewColorName(event.target.value);
  };

  const handlePaletteNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewPaletteName(event.target.value);
  };

  const handleCreateNewPalette = (): void => {
    const newPalette: ColorPalette = {
      paletteName: newPaletteName,
      emoji: '',
      id: newPaletteName.toLowerCase().replaceAll(' ', '-'),
      colors,
    };

    savePalette(newPalette);

    history.push('/');
  };

  const handleRemoveColorFromPalette = (colorName: string): void => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  useEffect(() => {
    ValidatorForm.addValidationRule(
      'isColorNameUnique',
      (value: string): boolean => {
        return colors.every(
          ({ name }) => name.toLowerCase() !== value.toLowerCase()
        );
      }
    );
    ValidatorForm.addValidationRule('isColorUnique', (): boolean => {
      return colors.every(
        ({ color }) => color.toLowerCase() !== currentColor.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule(
      'isPaletteNameUnique',
      (value: string): boolean => {
        return palettes.every(
          ({ paletteName, id }) =>
            paletteName.toLowerCase() !== value.toLowerCase() &&
            id !== value.toLowerCase().replaceAll(' ', '-')
        );
      }
    );
  }, [colors, currentColor, palettes]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color='default'
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

          <ValidatorForm
            onSubmit={handleCreateNewPalette}
            onError={(errors) => console.log(errors)}
          >
            <TextValidator
              value={newPaletteName}
              onChange={handlePaletteNameChange}
              name='newPaletteName'
              label='palette name'
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Please enter a name for the palette',
                'The name is already taken by another palette',
              ]}
            />

            <Button variant='contained' color='secondary' type='submit'>
              Save Palette
            </Button>
          </ValidatorForm>
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

        <ValidatorForm
          onSubmit={createNewColor}
          onError={(errors) => console.log(errors)}
        >
          <TextValidator
            value={newColorName}
            onChange={handleColorNameChange}
            name='newColorName'
            label='color name'
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Please enter a color name',
              'Color name already exsits',
              'This color already exists',
            ]}
          />

          <Button
            variant='contained'
            color='primary'
            type='submit'
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
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        {colors.map((color) => (
          <DraggableColorBox
            key={`${color.name}-${color.color}`}
            color={color}
            removeColorFromPalette={handleRemoveColorFromPalette}
          />
        ))}
      </main>
    </div>
  );
};

export default NewPaletteForm;
