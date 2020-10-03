import React, { Component } from 'react';
import { render } from 'react-dom';
import Cards from './Cards.jsx'


const Display = (props) => {
  const cards = []
  for (let i = 0; i < props.officials.length; i++) {
    cards.push(<Card />)
  }
  return (
    <div>
      {cards}
    </div>
  )
}

export default Display;