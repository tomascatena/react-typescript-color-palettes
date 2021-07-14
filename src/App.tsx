import { Redirect, Route, Switch } from 'react-router-dom';
import Palette from './components/Palette/Palette';
import seedPalettes from './data/seedPalettes';
import './App.css';
import { generatePalette } from './utils/colorHelpers';
import PaletteList from './components/PaletteList/PaletteList';
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm/NewPaletteForm';
import { useState } from 'react';
import useLocalStorage from './utils/useLocalStorage';

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

const App = (): JSX.Element => {
  const [savedPalettes, setSavedPalettes] = useLocalStorage<ColorPalette[]>(
    'palettes',
    seedPalettes
  );

  const [palettes, setPalettes] = useState<ColorPalette[]>(seedPalettes);

  const findPalette = (id: string): ColorPalette => {
    return savedPalettes.find((palette) => palette.id === id) as ColorPalette;
  };

  const savePalette = (newPalette: ColorPalette): void => {
    setPalettes([...palettes, newPalette]);
    setSavedPalettes([...savedPalettes, newPalette]);
  };

  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => {
          return <PaletteList palettes={savedPalettes} />;
        }}
      />
      <Route
        exact
        path='/palette/new'
        render={() => {
          return (
            <NewPaletteForm
              savePalette={savePalette}
              palettes={savedPalettes}
            />
          );
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
