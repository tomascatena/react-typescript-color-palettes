import { Redirect, Route, Switch } from 'react-router-dom';
import Palette from './components/Palette/Palette';
import seedPalettes from './seedPalettes';
import './App.css';
import { generatePalette } from './colorHelpers';

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

const App = (): JSX.Element => {
  const findPalette = (id: string): ColorPalette => {
    return seedPalettes.find((palette) => palette.id === id) as ColorPalette;
  };

  return (
    <Switch>
      <Route exact path='/'>
        <h1>Palette List Goes Here</h1>
      </Route>

      <Route
        exact
        path='/palette/:id'
        render={(routeProps) => {
          if (!findPalette(routeProps.match.params.id)) {
            return <Redirect to='/'></Redirect>;
          } else {
            return (
              <div className='App'>
                <Palette
                  colorPalette={generatePalette(
                    findPalette(routeProps.match.params.id)
                  )}
                />
              </div>
            );
          }
        }}
      ></Route>
    </Switch>
  );
};

export default App;
