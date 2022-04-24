import { Color } from '@pages/CreatePalettePage/CreatePalettePage';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { arrayMove } from 'react-sortable-hoc';
import Default, { DraggableColorList } from './DraggableColorList';
import React, { useState } from 'react';
import seedPalettes from '@data/seedPalettes';

export default {
  title: 'Components/DraggableColorList',
  component: DraggableColorList,
} as ComponentMeta<typeof DraggableColorList>;

const Template: ComponentStory<typeof Default> = (args) => {
  const [colors, setColors] = useState<Color[]>(seedPalettes[0].colors);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <div style={{ height: '100vh' }}>
      <Default
        {...args}
        onSortEnd={onSortEnd}
        axis='xy'
        distance={20}
        colors={colors}
      />
    </div>
  );
};

export const Standard = Template.bind({});
