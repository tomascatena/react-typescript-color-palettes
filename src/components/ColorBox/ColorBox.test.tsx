import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import ColorBox from './ColorBox';
import React from 'react';

const getClassNamesList = (element:HTMLElement) => {
  const classes = element.getAttribute('class');

  return classes ? classes.split(' ').map(className => className.split('-')[1]) : [];
};

const MOCK_COLOR = {
  hex: '#064cd5',
  id: 'merchantmarineblue',
  level: 500,
  name: 'MerchantMarineBlue 500',
};

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('ColorBox', () => {
  test('renders the correct styles when the copy button is clicked', () => {
    const TIMEOUT = 1500;

    render(
      <BrowserRouter>
        <ColorBox
          background={MOCK_COLOR.hex}
          name={MOCK_COLOR.name}
          id={MOCK_COLOR.id}
          showMoreLink={true}
        />
      </BrowserRouter>
    );

    const copyButton = screen.getByText(/copy/i);

    expect(copyButton).toBeInTheDocument();

    const copyOverlay = screen.getByTestId('copy-overlay');
    const copyMessage = screen.getByTestId('copy-message');

    expect(getClassNamesList(copyOverlay).includes('showOverlay')).toBe(false);
    expect(getClassNamesList(copyMessage).includes('showCopyMessage')).toBe(false);

    expect(copyOverlay).toBeInTheDocument();
    expect(copyMessage).toBeInTheDocument();

    fireEvent.click(copyButton);

    expect(getClassNamesList(copyOverlay).includes('showOverlay')).toBe(true);
    expect(getClassNamesList(copyMessage).includes('showCopyMessage')).toBe(true);

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), TIMEOUT);

    act(() => {
      jest.advanceTimersByTime(TIMEOUT);
    });

    expect(getClassNamesList(copyOverlay).includes('showOverlay')).toBe(false);
    expect(getClassNamesList(copyMessage).includes('showCopyMessage')).toBe(false);
  });
});
