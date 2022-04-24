import './App.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams
} from 'react-router-dom';
import { generatePalette } from '@utils/colorHelpers';
import CreatePalettePage from '@pages/CreatePalettePage/CreatePalettePage';
import Page from '@components/Page/Page';
import PaletteListPage from '@pages/PaletteListPage/PaletteListPage';
import PalettePage from '@pages/PalettePage/PalettePage';
import React, { useState } from 'react';
import SinglePalettePage from '@pages/SinglePalettePage/SinglePalettePage';
import seedPalettes from '@data/seedPalettes';
import useLocalStorage from '@utils/useLocalStorage'; ;

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

  const PaletteRoute = () => {
    const { id } = useParams();

    if (!id || !findPalette(id)) {
      return <Navigate to='/'></Navigate>;
    } else {
      return (
        <Page>
          <PalettePage
            colorPalette={generatePalette(
              findPalette(id)
            )}
          />
        </Page>
      );
    }
  };

  const SinglePaletteRoute = () => {
    const { paletteId, colorId } = useParams();

    if (!paletteId || !colorId || !findPalette(paletteId)) {
      return <Navigate to='/'></Navigate>;
    } else {
      return (
        <Page>
          <SinglePalettePage
            colorPalette={generatePalette(
              findPalette(paletteId)
            )}
            colorId={colorId}
          />
        </Page>
      );
    }
  };

  return (
    <Routes location={location}>
      <Route
        path='*'
        element={
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={500}
              classNames='page'
            >
              <Routes location={location}>
                <Route
                  path='/'
                  element={<PaletteListRoute/>}
                />

                <Route
                  path='/palette/new'
                  element={<CreatePaletteRoute/>}
                />

                <Route
                  path='/palette/:id'
                  element={<PaletteRoute/>}
                />

                <Route
                  path='/palette/:paletteId/:colorId'
                  element={<SinglePaletteRoute/>}
                />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        }
      ></Route>
    </Routes>
  );
};

export default App;
