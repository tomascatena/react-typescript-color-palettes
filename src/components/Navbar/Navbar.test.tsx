import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Navbar, { ColorFormats } from './Navbar';
import React from 'react';

const changeLevel = jest.fn();
const setColorFormat = jest.fn();

describe('Navbar', () => {
  test('should change the format of the color', async () => {
    render(
      <BrowserRouter>
        <Navbar
          level={500}
          colorFormat={ColorFormats.hex}
          changeLevel={changeLevel}
          setColorFormat={setColorFormat}
        />
      </BrowserRouter>
    );

    const select = (screen.getByTestId('select-color-format'));

    fireEvent.change(select, { target: { value: 'rgba' } });

    expect(setColorFormat).toHaveBeenCalledWith('rgba');
  });

  test('should close the snackbar when clicking in the close button', async () => {
    render(
      <BrowserRouter>
        <Navbar
          level={500}
          colorFormat={ColorFormats.hex}
          changeLevel={changeLevel}
          setColorFormat={setColorFormat}
        />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('snackbar')).not.toBeInTheDocument();
    });

    const select = (screen.getByTestId('select-color-format'));

    fireEvent.change(select, { target: { value: 'rgba' } });

    expect(screen.getByTestId('snackbar')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('close-snackbar-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('snackbar')).not.toBeInTheDocument();
    });
  });
});
