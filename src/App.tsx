import './App.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
} from 'react-router-dom';
import { generatePalette } from '@utils/colorHelpers';
import CreatePalettePage from '@pages/CreatePalettePage/CreatePalettePage';
import Page from '@components/Page/Page';
import PaletteListPage from '@pages/PaletteListPage/PaletteListPage';
import PalettePage from '@pages/PalettePage/PalettePage';
import React, { useState } from 'react';
import SinglePalettePage from '@pages/SinglePalettePage/SinglePalettePage';
import seedPalettes from '@data/seedPalettes';
import useLocalStorage from '@utils/useLocalStorage';

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

  const location = useLocation();
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
        <PaletteListPage
          deletePalette={deletePalette}
          palettes={savedPalettes}
        />
      </Page>
    );
  };

  const CreatePaletteRoute = () => {
    return (
      <Page>
        <CreatePalettePage
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
          <PalettePage
            colorPalette={generatePalette(
              findPalette(routeProps.match.params.id)
            )}
          />
        </Page>
      );
    }
  };

  const SinglePaletteRoute = (
    routeProps: RouteComponentProps<{ paletteId: string; colorId: string }>
  ) => {
    if (!findPalette(routeProps.match.params.paletteId)) {
      return <Redirect to='/'></Redirect>;
    } else {
      return (
        <Page>
          <SinglePalettePage
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
                  render={CreatePaletteRoute}
                />

                <Route
                  exact
                  path='/palette/:id'
                  render={PaletteRoute}
                />

                <Route
                  path='/palette/:paletteId/:colorId'
                  render={SinglePaletteRoute}
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
