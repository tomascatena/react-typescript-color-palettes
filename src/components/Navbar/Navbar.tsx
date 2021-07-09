import 'rc-slider/assets/index.css';
import './Navbar.css';
import Slider from 'rc-slider';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

enum ColorFormats {
  hex = 'hex',
  rgb = 'rgb',
  rgba = 'rgba',
}

interface NavbarProps {
  level: number;
  colorFormat: ColorFormats;
  changeLevel: (newLevel: number) => void;
  setColorFormat: (colorFormat: ColorFormats) => void;
}

const Navbar = ({
  level,
  colorFormat,
  changeLevel,
  setColorFormat,
}: NavbarProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const handleFormatChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setColorFormat(event.target.value as ColorFormats);
    setOpen(true);
  };

  const closeSnakbar = (): void => {
    setOpen(false);
  };

  return (
    <header className='navbar'>
      <div className='logo'>
        <Link to='/'>ReactTSColorPalette</Link>
      </div>

      <div className='sliderContainer'>
        <span>Level: {level}</span>

        <div className='slider'>
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={changeLevel}
          />
        </div>
      </div>

      <div className='selectContainer'>
        <Select onChange={handleFormatChange} value={colorFormat}>
          <MenuItem value='hex'>HEX - #ffffff</MenuItem>
          <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value='rgba'>RGBA - rgba(255,255,255,1)</MenuItem>
        </Select>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={3000}
        message={
          <span id='message-id'>
            Format Changed To {colorFormat.toUpperCase()}!
          </span>
        }
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        onClose={closeSnakbar}
        action={[
          <IconButton
            onClick={closeSnakbar}
            color='inherit'
            key='close'
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </header>
  );
};

export default Navbar;
