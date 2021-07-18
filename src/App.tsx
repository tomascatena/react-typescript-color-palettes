import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Palette from './components/Palette/Palette';
import seedPalettes from './data/seedPalettes';
import './App.css';
import { generatePalette } from './utils/colorHelpers';
import PaletteList from './components/PaletteList/PaletteList';
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm/NewPaletteForm';
import { useState } from 'react';
import useLocalStorage from './utils/useLocalStorage';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './components/Page/Page';
import { Location } from 'history';

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

  return (
    <Route
      render={(): JSX.Element => {
        return (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={500} classNames='page'>
              <Switch location={location}>
                <Route
                  exact
                  path='/'
                  render={() => {
                    return (
                      <Page>
                        <PaletteList
                          deletePalette={deletePalette}
                          palettes={savedPalettes}
                        />
                      </Page>
                    );
                  }}
                />
                <Route
                  exact
                  path='/palette/new'
                  render={() => {
                    return (
                      <Page>
                        <NewPaletteForm
                          savePalette={savePalette}
                          palettes={savedPalettes}
                        />
                      </Page>
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
                        <Page>
                          <Palette
                            colorPalette={generatePalette(
                              findPalette(routeProps.match.params.id)
                            )}
                          />
                        </Page>
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
                  }}
                />{' '}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        );
      }}
    ></Route>
  );
};

export default App;
