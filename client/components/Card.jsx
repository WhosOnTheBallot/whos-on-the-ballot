import React, { Component } from 'react';
import { render } from 'react-dom';

const Card = (props) => {
  // if (props.official.articles.length) {
  const cards = props.official.articles.map((el, index) => {
    return (
      <li>
        <a target="_blank" className="articleLinks" href={el}>
          News Article
        </a>
      </li>
    );
  });
  let partyClass;
  const { party } = props.official;
  if (party.charAt(0) === 'R') {
    partyClass = 'republican';
  } else if (party.charAt(0) === 'D') {
    partyClass = 'democrat';
  } else {
    partyClass = 'otherParty';
  }
  // } else {
  //   const cards = [];
  // }

  return (
    <div className={`card ${partyClass}`}>
      <p className="officerName"> {props.official.name}</p>
      <img
        className="officerPhoto"
        src={props.official.photoUrl ? props.official.photoUrl : 'https://images.wisegeek.com/american-flag.jpg'}
      />
      {/* <p>{props.official.photoUrl}hi</p> */}
      <header className="officerTitle"> {props.official.office}</header>
      <p className="officerParty"> {props.official.party}</p>
      {/* < className="officialArticles"> {props.official.articles}</p> */}
      <ul className="articleLinksContainer">{cards}</ul>
    </div>
  );
};

export default Card;
