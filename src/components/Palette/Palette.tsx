interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

interface PaletteProps {
  palettes: ColorPalette[];
}

const Palette = ({ palettes }: PaletteProps): JSX.Element => {
  return (
    <div className='Palette'>
      {/* Navbar */}

      <div className='PaletteColors'>{/* bunch of color boxes */}</div>

      {/* Footer */}
    </div>
  );
};

export default Palette;
