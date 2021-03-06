import { ValidatorForm } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import { pickRandomHexColor } from './pickRandomHexColor';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import DraggableColorList from '@components/DraggableColorList/DraggableColorList';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import NewPaletteColorPicker from '@components/NewPaletteColorPicker/NewPaletteColorPicker';
import PaletteFormNav from '@components/PaletteFormNav/PaletteFormNav';
import React, { FC, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import useStyles from './CreatePalettePage.styles';

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

interface CreatePalettePageProps {
  savePalette: (newPalette: ColorPalette) => void;
  palettes: ColorPalette[];
}

export type Color = { color: string; name: string };

const CreatePalettePage: FC<CreatePalettePageProps> = ({ savePalette, palettes }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(true);
  const [newColorName, setNewColorName] = useState('');
  const [currentColor, setCurrentColor] = useState('blue');
  const [colors, setColors] = useState<Color[]>(palettes[0].colors);

  const MAX_COLORS = 20;
  const isPaletteFull = colors.length >= MAX_COLORS;

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleRemoveColorFromPalette = (colorName: string): void => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const clearNewPalette = () => setColors([]);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value: string): boolean => {
      return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
    });

    ValidatorForm.addValidationRule('isColorUnique', (): boolean => {
      return colors.every(({ color }) => color.toLowerCase() !== currentColor.toLowerCase());
    });

    ValidatorForm.addValidationRule('isPaletteNameUnique', (value: string): boolean => {
      return palettes.every(
        ({ paletteName, id }) =>
          paletteName.toLowerCase() !== value.toLowerCase() &&
          id !== value.toLowerCase().replaceAll(' ', '-')
      );
    });
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
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
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
              onClick={() => pickRandomHexColor(colors, setNewColorName, setCurrentColor)}
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

export default CreatePalettePage;
