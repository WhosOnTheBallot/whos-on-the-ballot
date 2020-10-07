import React, { useState } from 'react';

const VoterCard = props => {
  console.log(props.selected);
  return (
    <div>
      <h1>Voter Card</h1>
      <ul>
        {props.selected.map(official => (
          <li key={official}>{official}</li>
        ))}
      </ul>
    </div>
  );
};

export default VoterCard;
