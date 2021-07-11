import { Fragment } from 'react';
import useStyles from './NewPaletteColorPickerStyles';
import chroma from 'chroma-js';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

interface NewPaletteColorPickerProps {
  currentColor: string;
  isPaletteFull: boolean;
  newColorName: string;
  colors: { color: string; name: string }[];
  setCurrentColor: (newcolor: string) => void;
  setNewColorName: (newColorName: string) => void;
  setColors: (colors: { color: string; name: string }[]) => void;
}

const NewPaletteColorPicker = ({
  currentColor,
  isPaletteFull,
  newColorName,
  colors,
  setCurrentColor,
  setNewColorName,
  setColors,
}: NewPaletteColorPickerProps): JSX.Element => {
  const classes = useStyles();

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

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default NewPaletteColorPicker;
