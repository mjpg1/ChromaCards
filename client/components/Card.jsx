import React from 'react';

const Card = ({ color }) => {
  const style = {
    width: '250px',
    boxShadow: '2px 4px 13px lightgray',
    borderRadius: '13px'
  }

  return <img src={`client/assets/color-cards/${color}.png`} style={style} />;
};

export default Card;