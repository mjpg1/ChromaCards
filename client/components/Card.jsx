import React from 'react';

const Card = ({ color, gray, selectCard }) => {
  const style = {
    width: '250px',
    boxShadow: '2px 4px 13px lightgray',
    borderRadius: '13px'
  }

  const type = gray ? 'gray' : 'color';

  return (
    <img
      src={`client/assets/${type}-cards/${color}.png`}
      style={style}
      onClick={() => selectCard({ color, gray })}
    />
  );
};

export default Card;