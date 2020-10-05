import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './Home.jsx';
import Display from './Display.jsx';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.addressSearch = this.addressSearch.bind(this);
  }

  addressSearch(zipcode) {
    // const zipcode = event.target.value;
    if (!zipcode || zipcode.length < 5 || Number(zipcode) === NaN) return;
    const reqBody = {
      address: zipcode,
    };
    fetch(`/officials`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })
      .then((response) => response.json())
      .then((officialsData) => {
        this.setState({
          ...this.state,
          data: officialsData,
        });
      })
      .catch((err) => {
        this.setState({
          data: [],
        });
      });
  }

  render() {
    const data = [];
    if (this.state.data.length) {
      data.push(<Display officials={this.state.data} />);
    } else {
      data.push(<Home className="home" addressSearch={this.addressSearch} />);
    }
    return <div id="inner-container">{data}</div>;
  }
}

export default Container;
