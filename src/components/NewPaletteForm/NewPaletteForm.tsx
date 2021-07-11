import useStyles from './NewPaletteFormStyles';
import { useState } from 'react';
import clsx from 'clsx';
import chroma from 'chroma-js';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { useEffect } from 'react';
import DraggableColorList from '../DraggableColorList/DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from '../PaletteFormNav/PaletteFormNav';

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
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState<boolean>(true);
  const [currentColor, setCurrentColor] = useState<string>('blue');
  const [colors, setColors] = useState<{ color: string; name: string }[]>(
    palettes[0].colors
  );
  const [newColorName, setNewColorName] = useState<string>('');

  const maxColors = 20;
  const isPaletteFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const createNewColor = () => {
    const newColor = { color: currentColor, name: newColorName };
    setColors([...colors, newColor]);

    setCurrentColor('#0000FF');
    setNewColorName('');
  };

  const handleColorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewColorName(event.target.value);
  };

  const handleRemoveColorFromPalette = (colorName: string): void => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const clearNewPalette = () => {
    setColors([]);
  };

  const pickRandomHexColor = async (): Promise<void> => {
    const isRnadomColorInNewPalette = (randomHexColor: string): boolean => {
      return colors.some((color) => {
        return color.color.toLowerCase() === randomHexColor.toLowerCase();
      });
    };

    const generateRandomHexColor = (): string => {
      return (
        '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')
      ).toLowerCase();
    };

    let randomHexColor = generateRandomHexColor();

    while (isRnadomColorInNewPalette(randomHexColor)) {
      randomHexColor = generateRandomHexColor();
    }

    try {
      const response = await fetch(
        `https://www.thecolorapi.com/id?hex=${randomHexColor.replace('#', '')}`
      );

      const data = await response.json();

      setNewColorName(data.name.value);
    } catch (error) {
      console.log(error);
    }

    setCurrentColor(randomHexColor);
  };

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
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
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        savePalette={savePalette}
        colors={colors}
      />

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

        <Button variant='contained' color='secondary' onClick={clearNewPalette}>
          Clear Palette
        </Button>

        <Button
          variant='contained'
          color='primary'
          onClick={pickRandomHexColor}
          disabled={isPaletteFull}
        >
          Random Color
        </Button>

        <ChromePicker
          color={currentColor}
          onChangeComplete={(newColor) => {
            setCurrentColor(newColor.hex);
          }}
        />

        <ValidatorForm onSubmit={createNewColor} onError={(errors) => {}}>
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
            disabled={isPaletteFull}
            style={{
              backgroundColor: currentColor,
              color:
                chroma(currentColor).luminance() >= 0.3
                  ? 'rgba(0, 0, 0, 0.7)'
                  : '#fff',
            }}
          >
            {isPaletteFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <DraggableColorList
          colors={colors}
          handleRemoveColorFromPalette={handleRemoveColorFromPalette}
          onSortEnd={onSortEnd}
          axis='xy'
        />
      </main>
    </div>
  );
};

export default NewPaletteForm;
