import { ComponentMeta, ComponentStory } from '@storybook/react';
import PaletteFormNav from './PaletteFormNav';
import React from 'react';
import seedPalettes from '@data/seedPalettes';

export default {
  title: 'Components/PaletteFormNav',
  component: PaletteFormNav,
} as ComponentMeta<typeof PaletteFormNav>;

const Template: ComponentStory<typeof PaletteFormNav> = (args) => {
  return (
    <PaletteFormNav {...args} />
  );
};

export const Standard = Template.bind({});

Standard.args = {
  open: false,
  colors: seedPalettes[0].colors,
  handleDrawerOpen: () => {},
  savePalette: () => {},
};
