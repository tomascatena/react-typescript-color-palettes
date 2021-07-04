import Palette from './components/Palette/Palette';
import seedPalettes from './seedPalettes';
import './App.css';

const App = (): JSX.Element => {
  return (
    <div className='App'>
      <Palette palettes={seedPalettes[2]} />
    </div>
  );
};

export default App;
