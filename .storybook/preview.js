import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import '../src/App.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};


export const decorators = [
  // MUI Theme
  (Story, context) => {
    return (
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={500}
          classNames='page'
        >
          <Story {...context} />
        </CSSTransition>
      </TransitionGroup>
    );
  },
  // React Router
  (Story, context) => (
    <BrowserRouter>
      <Route
        render={() => {
          return (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={500}
                classNames='page'
              >
                <Switch location={location}>
                  <Route
                    path='*'
                    render={() => <Story {...context} />}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      ></Route>
    </BrowserRouter>
  ),
];
