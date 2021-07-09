import Palette from './components/Palette/Palette';
import seedPalettes from './seedPalettes';
import './App.css';
import { generatePalette } from './colorHelpers';

const App = (): JSX.Element => {
  return (
    <div className='App'>
      <Palette colorPalette={generatePalette(seedPalettes[2])} />
    </div>
  );
};

export default App;
