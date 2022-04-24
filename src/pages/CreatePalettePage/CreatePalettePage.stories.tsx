import { ComponentMeta, ComponentStory } from '@storybook/react';
import CreatePalettePage from './CreatePalettePage';
import React from 'react';
import seedPalettes from '@data/seedPalettes';

export default {
  title: 'Pages/CreatePalettePage',
  component: CreatePalettePage,
} as ComponentMeta<typeof CreatePalettePage>;

const Template: ComponentStory<typeof CreatePalettePage> = (args) => {
  return (
    <CreatePalettePage {...args} />
  );
};

export const Standard = Template.bind({});

Standard.args = {
  palettes: seedPalettes,
  savePalette: () => {},
};
