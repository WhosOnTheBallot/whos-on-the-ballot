import React, { Component } from 'react';
import { render } from 'react-dom';

/* eslint-disable */

// title
// Login with Google
// some other stuff potentially

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Who's On The Ballot</h1>
        <button
          id="login-btn"
          onClick={(event) => (window.location.href = '/auth/google')}
        >
          Login With Google
        </button>
      </div>
    );
  }
}

export default Login;
