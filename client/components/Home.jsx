import React, { Component } from 'react';
import { render } from 'react-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    };
  }

  //render method will render header, form, and button and functionality will be added as attirutes in renderings
  render() {
    return (
      <div id="home-container">
        <header className="header">
          <h1 id="title">
            <span className="whos">Who's</span>
            <span className="onThe"> on the</span>
            <span className="ballot"> Ballot?</span>
          </h1>
        </header>
        <input
          id="addressInput"
          placeholder="Enter your zipcode here"
          type="text"
          onChange={(e) => this.setState({ address: e.target.value })}
        />
        <button id="search-btn" onClick={(e) => this.props.addressSearch(this.state.address)}>
          Search
        </button>
      </div>
    );
  }
}

export default Home;
