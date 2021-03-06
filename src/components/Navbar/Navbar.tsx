import 'rc-slider/assets/index.css';
import { Link } from 'react-router-dom';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import NavbarStyles from './NavbarStyles';
import React, { FC, useState } from 'react';
import Select from '@material-ui/core/Select';
import Slider from 'rc-slider';
import Snackbar from '@material-ui/core/Snackbar';

export enum ColorFormats {
  hex = 'hex',
  rgb = 'rgb',
  rgba = 'rgba',
}

interface NavbarProps extends WithStyles<typeof NavbarStyles> {
  level?: number;
  colorFormat: ColorFormats;
  changeLevel?: (newLevel: number) => void;
  setColorFormat: (colorFormat: ColorFormats) => void;
}

export const Navbar: FC<NavbarProps> = ({ classes, level, colorFormat, changeLevel, setColorFormat }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleFormatChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setColorFormat(event.target.value as ColorFormats);
    setOpen(true);
  };

  const closeSnackbar = (): void => {
    setOpen(false);
  };

  const snackbarMessage = () => (
    <span
      className={classes.formatChangeMessage}
      id='message-id'
    >
      Format Changed To {colorFormat.toUpperCase()}!
    </span>
  );

  const snackbarActionIcon = () => (
    <IconButton
      data-testid='close-snackbar-button'
      onClick={closeSnackbar}
      color='inherit'
      key='close'
      aria-label='close'
    >
      <CloseIcon />
    </IconButton>
  );

  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>
        <Link to='/'>React Colors</Link>
      </div>

      {changeLevel && (
        <div className={classes.sliderContainer}>
          <span>Level: {level}</span>

          <div className={classes.slider}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
      )}

      <div className={classes.selectContainer}>
        <Select
          onChange={handleFormatChange}
          value={colorFormat}
          inputProps={{
            'data-testid': 'select-color-format'
          }}
        >
          <MenuItem value='hex'>HEX - #ffffff</MenuItem>
          <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value='rgba'>RGBA - rgba(255,255,255,1)</MenuItem>
        </Select>
      </div>

      <Snackbar
        data-testid='snackbar'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={3000}
        message={snackbarMessage()}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        onClose={closeSnackbar}
        action={[snackbarActionIcon()]}
      />
    </nav>
  );
};

export default withStyles(NavbarStyles)(Navbar);
