import Palette from './components/Palette/Palette';
import seedPalettes from './seedPalettes';

const App = (): JSX.Element => {
  return (
    <div>
      <Palette palettes={seedPalettes} />
    </div>
  );
};

export default App;
