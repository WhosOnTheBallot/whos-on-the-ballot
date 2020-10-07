import React, { useState } from 'react';

const Card = props => {
  const [selected, setSelected] = useState(false);

  const { name } = props.official;
  return (
    <div className='card'>
      <span>{name}</span>
      <button
        onClick={() =>
          selected == false ? setSelected(true) : setSelected(false)
        }
      >
        {' '}
        Click Here
      </button>
    </div>
  );
};

export default Card;
