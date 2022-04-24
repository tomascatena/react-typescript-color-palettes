import { ColorPalette } from '../../App';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { generatePalette } from '@utils/colorHelpers';
import Default, { SingleColorShadesPage } from './SingleColorShadesPage';
import React from 'react';
import seedPalettes from '@data/seedPalettes';

export default {
  title: 'Pages/SingleColorShadesPage',
  component: SingleColorShadesPage,
} as ComponentMeta<typeof SingleColorShadesPage>;

const Template: ComponentStory<typeof Default> = (args) => {
  const findPalette = (id: string): ColorPalette => {
    return seedPalettes.find((palette) => palette.id === id) as ColorPalette;
  };

  return (
    <Default
      {...args}
      colorPalette={generatePalette(findPalette('material-ui-colors'))}
      colorId='blue'
    />
  );
};

export const Standard = Template.bind({});
