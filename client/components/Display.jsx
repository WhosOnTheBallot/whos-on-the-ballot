import React, { Component } from 'react';
import { render } from 'react-dom';
import Card from './Card.jsx'


const Display = (props) => {
  const cards = []
  for (let i = 0; i < props.officials.length; i++) {
    cards.push(<Card official={props.officials[i]} />)
  }
  return (
    <div>
      {cards}
    </div>
  )
}

export default Display;