import React, { Component } from 'react';
import { render } from 'react-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  
  


  //functionality for input field and button

    // send this data to our API and potentially get info back  
    // send a request to /data endpoint with a JSON object 
    // { address: address}
    // make a fetch request to the endpoint "/election"
    // send the  JSON object
    // use .thens and harness the data that is returned
    // use the data in some way

  //render method will render header, form, and button and functionality will be added as attirutes in renderings
  render() {
    return (
      <div>
        <header className="header"><h1>Who's On The Ballot?</h1></header>
        <form className="inputForm">
            <input
              id="addressInput"
              placeholder="Enter your address here"
              type='text'
          />
          <button onClick={this.props.addressSearch}>
            {/* <button onClick={this.props.addressSearch}> */}
              Search
            </button>
          </form>
      </div>
    )
  }
}

export default Home;

