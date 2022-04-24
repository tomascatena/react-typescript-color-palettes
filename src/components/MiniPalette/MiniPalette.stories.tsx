import { ComponentMeta, ComponentStory } from '@storybook/react';
import Default, { MiniPalette } from './MiniPalette';
import React from 'react';
import seedPalettes from '@data/seedPalettes';

export default {
  title: 'Components/MiniPalette',
  component: MiniPalette,
} as ComponentMeta<typeof MiniPalette>;

const Template: ComponentStory<typeof Default> = (args) => {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '25rem' }}>
        <Default {...args}/>
      </div>
    </div>
  );
};

export const Standard = Template.bind({});

Standard.args = {
  paletteName: seedPalettes[0].paletteName,
  emoji: seedPalettes[0].emoji,
  id: seedPalettes[0].id,
  colors: seedPalettes[0].colors,
  openDialog: () => { console.log('Dialog Opened!'); }
};
