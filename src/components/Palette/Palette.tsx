import ColorBox from '../ColorBox/ColorBox';
import './Palette.css';

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

interface PaletteProps {
  palettes: ColorPalette;
}

const Palette = ({ palettes }: PaletteProps): JSX.Element => {
  return (
    <div className='Palette'>
      {/* Navbar */}

      <div className='PaletteColors'>
        {palettes.colors.map(
          ({ color, name }): JSX.Element => (
            <ColorBox key={`${name}-${color}`} background={color} name={name} />
          )
        )}
      </div>

      {/* Footer */}
    </div>
  );
};

export default Palette;
