import { ComponentMeta, ComponentStory } from '@storybook/react';
import Default, { ColorBox } from './ColorBox';
import React from 'react';

const COLOR = {
  hex: '#064cd5',
  id: 'merchantmarineblue',
  level: 500,
  name: 'MerchantMarineBlue 500',
  rgb: 'rgb(6,76,213)',
  rgba: 'rgba(6,76,213,1.0)',
};

export default {
  title: 'Components/ColorBox',
  component: ColorBox,
} as ComponentMeta<typeof ColorBox>;

const Template: ComponentStory<typeof Default> = (args) => {
  return (
    <div style={{ height: '100vh' }}>
      <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Default {...args} />
      </div>
    </div>
  );
};

export const Standard = Template.bind({});

Standard.args = {
  background: COLOR.hex,
  name: COLOR.name,
  id: COLOR.id
};
