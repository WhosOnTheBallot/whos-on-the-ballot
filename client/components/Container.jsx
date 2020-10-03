import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './Home.jsx'
import Display from './Display.jsx';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }

    this.addressSearch = this.addressSearch.bind(this)
  }

  addressSearch(event) {
    const address = event.target.value;
    console.log(address);
  }

  render() {
    // conditional check if we have 
    if (this.state.data) {
      return (
        <div>
          {/* // display rendered here */}
          <Display officials={this.state.data} />
        </div>
      )
      //do something with data
    } else {
      //if we dont' have data render home
      return (
        <div className='home'>
          <Home addressSearch={this.addressSearch} />
        </div>
      )
    }
  }

}

export default Container;