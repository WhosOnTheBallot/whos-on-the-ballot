import React, { useState } from 'react';

const Card = props => {
  // const [selected, setSelected] = useState([]);

  const { name } = props.official;
  return (
    <div className='card'>
      <span>{name}</span>
      <button onClick={() => props.selectOfficial(name)}> Click Here</button>
    </div>
  );
};

export default Card;
