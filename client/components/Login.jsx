import React, { Component } from 'react';
import { render } from 'react-dom';
import Styles from '../styles.scss';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <h1>Who's On The Ballot?</h1>
        <button id="login-btn" onClick={(event) => (window.location.href = '/auth/google')}>
          Login With Google
        </button>
      </div>
    );
  }
}

export default Login;
