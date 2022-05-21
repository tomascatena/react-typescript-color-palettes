import { ColorPalette } from '../../App';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { generatePalette } from '@utils/colorHelpers/colorHelpers';
import Default, { PalettePage } from './PalettePage';
import React from 'react';
import seedPalettes from '@data/seedPalettes';

export default {
  title: 'Pages/PalettePage',
  component: PalettePage,
} as ComponentMeta<typeof PalettePage>;

const Template: ComponentStory<typeof Default> = (args) => {
  const findPalette = (id: string): ColorPalette => {
    return seedPalettes.find((palette) => palette.id === id) as ColorPalette;
  };

  return (
    <Default
      {...args}
      colorPalette={generatePalette(findPalette('material-ui-colors'))}
    />
  );
};

export const Standard = Template.bind({});
