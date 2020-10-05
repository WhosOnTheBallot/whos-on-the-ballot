import React, { Component } from 'react';
import { render } from 'react-dom';
import Card from './Card.jsx';

const Display = (props) => {
  const cards = props.officials.map((el, index) => {
    return <Card official={props.officials[index]} />;
  });
  return (
    <div className="display">
      <h1 id="displayTitle">Your Local Officials</h1>
      <div id="card-container">{cards}</div>
    </div>
  );
};

export default Display;
