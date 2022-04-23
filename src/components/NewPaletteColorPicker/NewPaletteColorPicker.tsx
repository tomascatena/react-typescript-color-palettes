import React, { FC } from 'react';

import Button from '@material-ui/core/Button';
import chroma from 'chroma-js';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import useStyles from './NewPaletteColorPickerStyles';

interface NewPaletteColorPickerProps {
  currentColor: string;
  isPaletteFull: boolean;
  newColorName: string;
  colors: { color: string; name: string }[];
  setCurrentColor: (newColor: string) => void;
  setNewColorName: (newColorName: string) => void;
  setColors: (colors: { color: string; name: string }[]) => void;
}

const NewPaletteColorPicker: FC<NewPaletteColorPickerProps> = ({
  currentColor,
  isPaletteFull,
  newColorName,
  colors,
  setCurrentColor,
  setNewColorName,
  setColors,
}) => {
  const classes = useStyles();

  const createNewColor = () => {
    const newColor = { color: currentColor, name: newColorName };
    setColors([...colors, newColor]);

    setCurrentColor('#0000FF');
    setNewColorName('');
  };

  const handleColorNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewColorName(event.target.value);
  };

  return (
    <div className={classes.root}>
      <ValidatorForm
        onSubmit={createNewColor}
        onError={() => {}}
      >
        <ChromePicker
          color={currentColor}
          onChangeComplete={(newColor) => {
            setCurrentColor(newColor.hex);
          }}
          className={classes.colorPicker}
        />

        <TextValidator
          value={newColorName}
          onChange={handleColorNameChange}
          name='newColorName'
          label='color name'
          className={classes.colorNameInput}
          autoComplete='off'
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={[
            'Please enter a color name',
            'Color name already exists',
            'This color already exists',
          ]}
          fullWidth
        />

        <Button
          variant='contained'
          color='primary'
          type='submit'
          disabled={isPaletteFull}
          className={classes.addColorButton}
          fullWidth
          style={{
            backgroundColor: currentColor,
            color: chroma(currentColor).luminance() >= 0.3 ? 'rgba(0, 0, 0, 0.7)' : '#fff',
          }}
        >
          {isPaletteFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default NewPaletteColorPicker;
