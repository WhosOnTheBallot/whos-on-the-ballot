import React, { Component } from 'react';
import { render } from 'react-dom';
import Card from './Card.jsx'


const Display = (props) => {
  console.log('in display component props', props.officials[0])
  const cards = props.officials.map((el, index) => {
    return <Card official={props.officials[index]} />
  })
  return (
    <div>
      {cards}
    </div>
  )
}

export default Display;