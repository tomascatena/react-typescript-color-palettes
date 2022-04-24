import { Color } from '@pages/CreatePalettePage/CreatePalettePage';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import NewPaletteColorPicker from './NewPaletteColorPicker';
import React, { useState } from 'react';
import seedPalettes from '@data/seedPalettes'; ;

export default {
  title: 'Components/NewPaletteColorPicker',
  component: NewPaletteColorPicker,
} as ComponentMeta<typeof NewPaletteColorPicker>;

const Template: ComponentStory<typeof NewPaletteColorPicker> = (args) => {
  const [newColorName, setNewColorName] = useState<string>('New Color Name');
  const [currentColor, setCurrentColor] = useState<string>('blue');
  const [colors, setColors] = useState<Color[]>(seedPalettes[0].colors);

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <NewPaletteColorPicker
          {...args}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          newColorName={newColorName}
          colors={colors}
          setNewColorName={() => setNewColorName(newColorName)}
          setColors={setColors}
        />
      </div>
    </div>
  );
};

export const Standard = Template.bind({});

Standard.args = {
  currentColor: seedPalettes[0].colors[0].color,
  isPaletteFull: false,
  newColorName: 'New Color Name',
  colors: seedPalettes[0].colors,
  setCurrentColor: () => {},
  setNewColorName: () => {},
  setColors: () => {},
};
