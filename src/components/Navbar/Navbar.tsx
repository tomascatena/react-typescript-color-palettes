import 'rc-slider/assets/index.css';
import './Navbar.css';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

enum ColorFormats {
  hex = 'hex',
  rgb = 'rgb',
  rgba = 'rgba',
}

interface NavbarProps {
  level: number;
  colorFormat: ColorFormats;
  changeLevel: (newLevel: number) => void;
  handleFormatChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const Navbar = ({
  level,
  colorFormat,
  changeLevel,
  handleFormatChange,
}: NavbarProps): JSX.Element => {
  return (
    <header className='navbar'>
      <div className='logo'>
        <a href='/'>ReactTSColorPalette</a>
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
    </header>
  );
};

export default Navbar;
