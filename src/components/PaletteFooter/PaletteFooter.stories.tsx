import { ComponentMeta, ComponentStory } from '@storybook/react';
import Default, { PaletteFooter } from './PaletteFooter';
import React from 'react';
import seedPalettes from '@data/seedPalettes';

export default {
  title: 'Components/PaletteFooter',
  component: PaletteFooter,
} as ComponentMeta<typeof PaletteFooter>;

const Template: ComponentStory<typeof Default> = (args) => {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'flex-end' }}>
      <div style={{ width: '100%' }}>
        <Default
          {...args}
        />
      </div>
    </div>
  );
};

export const Standard = Template.bind({});

Standard.args = {
  colorPalette: seedPalettes[0]
};
