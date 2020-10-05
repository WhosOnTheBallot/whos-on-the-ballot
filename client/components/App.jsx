import React, { Component } from 'react';
import { render } from 'react-dom';
import Container from './Container.jsx';
import Login from './Login.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="outer-container">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/search" component={Container} />
        </Switch>
      </div>
    );
  }
}

export default App;
