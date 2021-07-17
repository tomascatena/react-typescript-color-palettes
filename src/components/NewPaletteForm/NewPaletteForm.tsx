import useStyles from './NewPaletteFormStyles';
import { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useEffect } from 'react';
import DraggableColorList from '../DraggableColorList/DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from '../PaletteFormNav/PaletteFormNav';
import NewPaletteColorPicker from '../NewPaletteColorPicker/NewPaletteColorPicker';

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
  const [newColorName, setNewColorName] = useState<string>('');
  const [currentColor, setCurrentColor] = useState<string>('blue');
  const [colors, setColors] = useState<{ color: string; name: string }[]>(
    palettes[0].colors
  );

  const maxColors = 20;
  const isPaletteFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
          <Typography>Design Your Palette</Typography>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <Divider />

        <div className={classes.colorPickerContainer}>
          <div className={classes.buttons}>
            <NewPaletteColorPicker
              currentColor={currentColor}
              isPaletteFull={isPaletteFull}
              setCurrentColor={setCurrentColor}
              newColorName={newColorName}
              colors={colors}
              setNewColorName={setNewColorName}
              setColors={setColors}
            />

            <Button
              variant='outlined'
              color='primary'
              onClick={pickRandomHexColor}
              disabled={isPaletteFull}
            >
              Random Color
            </Button>

            <Button
              variant='outlined'
              color='secondary'
              onClick={clearNewPalette}
            >
              Clear Palette
            </Button>
          </div>
        </div>
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
          distance={20}
        />
      </main>
    </div>
  );
};

export default NewPaletteForm;
