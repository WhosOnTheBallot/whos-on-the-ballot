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
    const zipcode = event.target.value;
    if ((!zipcode) || zipcode.length < 5 || Number(zipcode) === NaN) return;
    const reqBody = {
      address: zipcode
    }
    fetch('/officals', {
      method: 'POST',
      header: {
        'content-type': 'application/json'
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
      .catch((err) => {
        console.log('error:', err)
        this.setState({
          data: []
        })
      })


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
          <div>
            <Home className='home' addressSearch={this.addressSearch} />
          </div>
        )
      }
    }
  }
}

export default Container;