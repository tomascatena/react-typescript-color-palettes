import { Link } from 'react-router-dom';

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
        return (
          <p>
            <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>;
          </p>
        );
      })}
    </div>
  );
};

export default PaletteList;
