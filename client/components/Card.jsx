import React, { Component } from 'react';
import { render } from 'react-dom';


const Card = (props) => {
  console.log('were in card component', props)
  return (
    <div className="card">
      <header className="officerTitle"> {props.official.office}</header>
      <img className="officerPhoto" src={props.official.photoURL} />
      <p className="officerName"> {props.official.name}</p>
      <p className="officerParty"> {props.official.party}</p>
    </div>
  )
}


export default Card;