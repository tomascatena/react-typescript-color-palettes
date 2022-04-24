import '@fontsource/roboto';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
