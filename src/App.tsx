import Palette from './components/Palette/Palette';
import seedPalettes from './seedPalettes';
import './App.css';
import { generatePalette } from './colorHelpers';

const App = (): JSX.Element => {
  console.log(generatePalette(seedPalettes[0]));

  return (
    <div className='App'>
      <Palette palettes={seedPalettes[2]} />
    </div>
  );
};

export default App;
