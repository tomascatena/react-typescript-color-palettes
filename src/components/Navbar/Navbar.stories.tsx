import { ComponentMeta, ComponentStory } from '@storybook/react';
import Default, { ColorFormats, Navbar } from './Navbar';
import React, { useState } from 'react';

export default {
  title: 'Components/Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Default> = (args) => {
  const [level, setLevel] = useState(500);
  const [colorFormat, setColorFormat] = useState<ColorFormats>(ColorFormats.hex);

  const changeLevel = (newLevel: number): void => {
    setLevel(newLevel);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ width: '100%' }}>
        <Default
          {...args}
          level={level}
          changeLevel={changeLevel}
          setColorFormat={setColorFormat}
          colorFormat={colorFormat}
        />
      </div>
    </div>
  );
};

export const Standard = Template.bind({});

Standard.args = {
  level: 500,
  colorFormat: ColorFormats.hex,
  setColorFormat: () => {},
  changeLevel: () => {}
};
