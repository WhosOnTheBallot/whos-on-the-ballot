import React, { Component } from 'react';
import { render } from 'react-dom';
import Card from './Card.jsx'


const Display = (props) => {

  const cards = props.officials.map((el) => {
    <Card data={el} />
  })
  return (
    <div>
      {cards}
    </div>
  )
}

export default Display;