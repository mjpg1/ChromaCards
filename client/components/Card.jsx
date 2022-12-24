import React from 'react';

const Card = ({ color, gray, selectCard }) => {
  const type = gray ? 'gray' : 'color';

  return (
    <img
      className='card'
      src={require(`../assets/${type}-cards/${color}.png`).default}
      onClick={selectCard}
    />
  );
};

export default Card;