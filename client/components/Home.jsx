import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }

  //render method will render header, form, and button and functionality will be added as attributes in renderings
  render() {
    return (
      <div id='home-container'>
        <header className='header'>
          <h1 id='title'>
            <span className='whos'>Your</span>
            <span className='onThe'> Local</span>
            <span className='ballot'> Officials</span>
          </h1>
        </header>
        <input
          id='addressInput'
          placeholder='Enter your zipcode here'
          type='text'
          onChange={e => this.setState({ address: e.target.value })}
        />
        <button
          id='search-btn'
          onClick={e => this.props.addressSearch(this.state.address)}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Home;
