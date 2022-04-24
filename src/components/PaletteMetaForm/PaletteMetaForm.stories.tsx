import { ComponentMeta, ComponentStory } from '@storybook/react';
import Default, { PaletteMetaForm } from './PaletteMetaForm';
import React from 'react';

export default {
  title: 'Components/PaletteMetaForm',
  component: PaletteMetaForm,
} as ComponentMeta<typeof PaletteMetaForm>;

const Template: ComponentStory<typeof Default> = (args) => {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Default
        {...args}
      />
    </div>
  );
};

export const Standard = Template.bind({});

Standard.args = {
  newPaletteName: 'New Palette Name',
  handlePaletteNameChange: () => {},
  handleCreateNewPalette: () => {},
};
