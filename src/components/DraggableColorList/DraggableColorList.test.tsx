import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import DraggableColorList from './DraggableColorList';
import React from 'react';

const MOCK_COLORS = [
  { name: 'red', color: '#F44336' },
  { name: 'pink', color: '#E91E63' },
  { name: 'purple', color: '#9C27B0' },
  { name: 'deeppurple', color: '#673AB7' },
  { name: 'indigo', color: '#3F51B5' },
  { name: 'blue', color: '#2196F3' },
  { name: 'lightblue', color: '#03A9F4' },
  { name: 'cyan', color: '#00BCD4' },
  { name: 'teal', color: '#009688' },
  { name: 'green', color: '#4CAF50' },
  { name: 'lightgreen', color: '#8BC34A' },
  { name: 'lime', color: '#CDDC39' },
  { name: 'yellow', color: '#FFEB3B' },
  { name: 'amber', color: '#FFC107' },
  { name: 'orange', color: '#FF9800' },
  { name: 'deeporange', color: '#FF5722' },
  { name: 'brown', color: '#795548' },
  { name: 'grey', color: '#9E9E9E' },
  { name: 'bluegrey', color: '#607D8B' },
];

describe('DraggableColorList', () => {
  test('should render the correct number of DraggableColorBoxes', () => {
    const removeColorFromPalette = jest.fn();

    render(
      <BrowserRouter>
        <DraggableColorList
          handleRemoveColorFromPalette={removeColorFromPalette}
          colors={MOCK_COLORS}
        />
      </BrowserRouter>
    );

    const draggableColorBoxes = screen.getByTestId('draggable-color-boxes');

    expect(draggableColorBoxes).toBeInTheDocument();

    const draggableColorBox = screen.getAllByTestId('draggable-color-box');

    expect(draggableColorBox).toHaveLength(MOCK_COLORS.length);
  });
});
