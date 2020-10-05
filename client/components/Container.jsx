import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './Home.jsx';
import Display from './Display.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

    this.addressSearch = this.addressSearch.bind(this);
  }

  addressSearch(zipcode) {
    if (!zipcode || zipcode.length < 5 || Number(zipcode) === NaN) return;
    const reqBody = {
      address: zipcode
    };
    fetch(`/officials`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
      .then((response) => response.json())
      .then((officialsData) => {
        this.setState({
          ...this.state,
          data: officialsData
        });
      })
      .catch((err) => {
        this.setState({
          data: []
        });
      });
  }

  render() {
    const itemToRender = this.state.data.length ? (
      <Display officials={this.state.data} />
    ) : (
      <Home className="home" addressSearch={this.addressSearch} />
    );
    // let itemToRender;
    // if (this.state.data.length) {
    //   itemToRender = <Display officials={this.state.data} />;
    // } else {
    //   itemToRender = <Home className="home" addressSearch={this.addressSearch} />;
    // }
    return <div id="inner-container">{itemToRender}</div>;
  }
}

export default Container;
