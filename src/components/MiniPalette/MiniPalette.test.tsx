import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import MiniPalette from './MiniPalette';
import React from 'react';

const MOCK_PALETTE = {
  paletteName: 'Material UI Colors',
  id: 'material-ui-colors',
  emoji: '🎨',
  colors: [
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
  ],
};

const openDialog = jest.fn();
const mockUseNavigate = jest.fn();

jest.mock(
  'react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
  })
);

describe('MiniPalette', () => {
  test('should call openDialog when the delete icon is clicked', () => {
    render(
      <BrowserRouter>
        <MiniPalette
          openDialog={openDialog}
          {...MOCK_PALETTE}
        />
      </BrowserRouter>
    );

    const deleteIcon = screen.getByTestId('delete-palette');

    expect(deleteIcon).toBeInTheDocument();

    fireEvent.click(deleteIcon);

    expect(openDialog).toHaveBeenCalledWith(MOCK_PALETTE.id);
  });

  test('navigate to the palette page when the mini palette is clicked', () => {
    render(
      <BrowserRouter>
        <MiniPalette
          openDialog={openDialog}
          {...MOCK_PALETTE}
        />
      </BrowserRouter>
    );

    const miniPalette = screen.getByTestId('mini-palette');

    fireEvent.click(miniPalette);

    expect(mockUseNavigate).toHaveBeenCalledWith(`/palette/${MOCK_PALETTE.id}`);
  });
});
