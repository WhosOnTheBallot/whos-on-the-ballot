import React, { Component } from 'react';
import { render } from 'react-dom';
import Card from './Card.jsx';

const Display = (props) => {
  const cards = props.officials.map((el, index) => {
    return <Card official={props.officials[index]} />;
  });
  return <div id="card-container">{cards}</div>;
};

export default Display;
