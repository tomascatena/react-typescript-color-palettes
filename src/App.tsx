import { Redirect, Route, Switch } from 'react-router-dom';
import Palette from './components/Palette/Palette';
import seedPalettes from './seedPalettes';
import './App.css';
import { generatePalette } from './colorHelpers';
import PaletteList from './components/PaletteList/PaletteList';
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm/NewPaletteForm';

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
      <Route
        exact
        path='/'
        render={() => {
          return <PaletteList palettes={seedPalettes} />;
        }}
      />
      <Route
        exact
        path='/palette/new'
        render={() => {
          return <NewPaletteForm />;
        }}
      />
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
      />
      <Route
        path='/palette/:paletteId/:colorId'
        render={(routeProps) => {
          if (!findPalette(routeProps.match.params.paletteId)) {
            return <Redirect to='/'></Redirect>;
          } else {
            return (
              <div className='App'>
                <SingleColorPalette
                  colorPalette={generatePalette(
                    findPalette(routeProps.match.params.paletteId)
                  )}
                  colorId={routeProps.match.params.colorId}
                />
              </div>
            );
          }
        }}
      />{' '}
    </Switch>
  );
};

export default App;
