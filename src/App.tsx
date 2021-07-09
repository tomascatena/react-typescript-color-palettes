import { Route, Switch } from 'react-router-dom';
import Palette from './components/Palette/Palette';
import seedPalettes from './seedPalettes';
import './App.css';
import { generatePalette } from './colorHelpers';

const App = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/'>
        <h1>Palette List Goes Here</h1>
      </Route>

      <Route exact path='/palette/:id'>
        <div className='App'>
          <Palette colorPalette={generatePalette(seedPalettes[2])} />
        </div>
      </Route>
    </Switch>
  );
};

export default App;
