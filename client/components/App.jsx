import React, { Component } from 'react';
import { render } from 'react-dom';
import Container from './Container.jsx';
import Login from './Login.jsx';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: cookies.get('loggedIn') ? true : false,
    };
  }

  componentDidUpdate() {
    console.log('hello!');
    if (cookies.get('loggedIn')) {
      this.setState({
        loggedIn: cookies.get('loggedIn'),
      });
    }
  }

  render() {
    return (
      <div id="outer-container">
        {this.state.loggedIn ? <Container /> : <Login />}
        {/* <Login /> */}
        {/* <Container /> */}
      </div>
    );
  }
}

export default App;
