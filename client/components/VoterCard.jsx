import React, { useState } from 'react';

const VoterCard = props => {
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
