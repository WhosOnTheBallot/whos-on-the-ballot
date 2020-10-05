import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import styles from './styles.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
