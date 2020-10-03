import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './Home.jsx'

class Container extends Component {
  render() {
    return (
      <div className='home'>
        <Home />
      </div>
    )
  }

}

export default Container;