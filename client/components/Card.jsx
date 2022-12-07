import React from 'react';

const Card = ({ color }) => {
  const style = {
    width: '250px'
  }

  return <img src={`client/assets/color-cards/${color}.png`} style={style} />;
};

export default Card;