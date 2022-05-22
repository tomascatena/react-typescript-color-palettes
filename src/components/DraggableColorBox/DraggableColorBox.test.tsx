import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import DraggableColorBox from './DraggableColorBox';
import DraggableColorList from '@components/DraggableColorList/DraggableColorList';
import React from 'react';

const MOCK_COLOR = {
  color: '#064cd5',
  name: 'MerchantMarineBlue 500',
};

describe('DraggableColorBox', () => {
  test('calls removeColorFromPalette with the correct argument when delete icon is clicked', () => {
    const removeColorFromPalette = jest.fn();

    render(
      <BrowserRouter>
        <DraggableColorList
          handleRemoveColorFromPalette={removeColorFromPalette}
          colors={[MOCK_COLOR]}
        >
          <DraggableColorBox
            color={MOCK_COLOR}
            index={0}
            removeColorFromPalette={removeColorFromPalette}
          />
        </DraggableColorList>
      </BrowserRouter>
    );

    const deleteIcon = screen.getByTestId('delete-icon');

    expect(deleteIcon).toBeInTheDocument();

    fireEvent.click(deleteIcon);

    expect(removeColorFromPalette).toHaveBeenCalledWith(MOCK_COLOR.name);
  });
});
