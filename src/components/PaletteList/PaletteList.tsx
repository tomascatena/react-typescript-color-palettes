import MiniPalette from '../MiniPalette/MiniPalette';

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

interface PaletteListProps {
  palettes: ColorPalette[];
}

const PaletteList = ({ palettes }: PaletteListProps): JSX.Element => {
  return (
    <div>
      <h1>React Colors</h1>

      {palettes.map((palette) => {
        return <MiniPalette {...palette} />;
      })}
    </div>
  );
};

export default PaletteList;
