import React, { Component } from 'react';
import { render } from 'react-dom';

const Card = (props) => {
  return (
    <div className="card">
      <p className="officerName"> {props.official.name}</p>
      <img className="officerPhoto" src={props.official.photoUrl} />
      {/* <p>{props.official.photoUrl}hi</p> */}
      <header className="officerTitle"> {props.official.office}</header>
      <p className="officerParty"> {props.official.party}</p>
    </div>
  );
};

export default Card;
