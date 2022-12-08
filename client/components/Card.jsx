import React from 'react';

const Card = ({ color, gray, selectCard }) => {
  const type = gray ? 'gray' : 'color';

  return (
    <img
      className='card'
      src={`client/assets/${type}-cards/${color}.png`}
      onClick={selectCard}
    />
  );
};

export default Card;