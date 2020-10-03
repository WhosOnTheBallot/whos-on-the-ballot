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
    if ((!address) || address.length < 5 || Number(address) === NaN) return;
    const reqBody = { address: address }
    fetch('/officials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
      .then((response) => response.json())
      .then((officialsData) => {
        this.setState({
          ...this.state,
          data: officialsData
        })
      })
  }

  render() {
    // conditional check if we have 
    if (this.state.data.length) {
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