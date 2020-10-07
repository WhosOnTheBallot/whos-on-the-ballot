import React from "react";

const Card = (props) => {
  const { name } = props.official;
  return (
    <div className='card'>
      <span>{name}</span>
    </div>
  );
};

export default Card;
