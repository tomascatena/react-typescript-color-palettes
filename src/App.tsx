import React, { useState } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { generatePalette } from './utils/colorHelpers';
import { Location } from 'history';
import seedPalettes from './data/seedPalettes';
import useLocalStorage from './utils/useLocalStorage';
import Page from './components/Page/Page';
import Palette from './pages/PalettePage/PalettePage';
import PaletteList from './pages/PaletteList/PaletteList';
import SingleColorPalette from './pages/SinglePalettePage/SinglePalettePage';
import NewPaletteForm from './pages/CreatePalettePage/CreatePalettePage';

import './App.css';

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

  const location = useLocation<Location>();
  const [palettes, setPalettes] = useState<ColorPalette[]>(seedPalettes);

  const findPalette = (id: string): ColorPalette => {
    return savedPalettes.find((palette) => palette.id === id) as ColorPalette;
  };

  const savePalette = (newPalette: ColorPalette): void => {
    setPalettes([...palettes, newPalette]);
    setSavedPalettes([...savedPalettes, newPalette]);
  };

  const deletePalette = (id: string): void => {
    setSavedPalettes(savedPalettes.filter((palette) => palette.id !== id));
  };

  const PaletteListRoute = () => {
    return (
      <Page>
        <PaletteList
          deletePalette={deletePalette}
          palettes={savedPalettes}
        />
      </Page>
    );
  };

  const NewPaletteFormRoute = () => {
    return (
      <Page>
        <NewPaletteForm
          savePalette={savePalette}
          palettes={savedPalettes}
        />
      </Page>
    );
  };

  const PaletteRoute = (routeProps: RouteComponentProps<{ id: string }>) => {
    if (!findPalette(routeProps.match.params.id)) {
      return <Redirect to='/'></Redirect>;
    } else {
      return (
        <Page>
          <Palette
            colorPalette={generatePalette(
              findPalette(routeProps.match.params.id)
            )}
          />
        </Page>
      );
    }
  };

  const SingleColorPaletteRoute = (
    routeProps: RouteComponentProps<{ paletteId: string; colorId: string }>
  ) => {
    if (!findPalette(routeProps.match.params.paletteId)) {
      return <Redirect to='/'></Redirect>;
    } else {
      return (
        <Page>
          <SingleColorPalette
            colorPalette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
            colorId={routeProps.match.params.colorId}
          />
        </Page>
      );
    }
  };

  return (
    <Route
      render={(): JSX.Element => {
        return (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={500}
              classNames='page'
            >
              <Switch location={location}>
                <Route
                  exact
                  path='/'
                  render={PaletteListRoute}
                />

                <Route
                  exact
                  path='/palette/new'
                  render={NewPaletteFormRoute}
                />

                <Route
                  exact
                  path='/palette/:id'
                  render={PaletteRoute}
                />

                <Route
                  path='/palette/:paletteId/:colorId'
                  render={SingleColorPaletteRoute}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        );
      }}
    ></Route>
  );
};

export default App;
