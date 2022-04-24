import { ComponentMeta, ComponentStory } from '@storybook/react';
import Default, { PaletteListPage } from './PaletteListPage';
import React from 'react';
import seedPalettes from '@data/seedPalettes';

export default {
  title: 'Pages/PaletteListPage',
  component: PaletteListPage,
} as ComponentMeta<typeof PaletteListPage>;

const Template: ComponentStory<typeof Default> = (args) => {
  return (
    <Default {...args} />
  );
};

export const Standard = Template.bind({});

Standard.args = {
  palettes: seedPalettes,
  deletePalette: () => {},
};
