import React from 'react';

const Card = ({ color, gray, selectCard }) => {
  const style = {
    width: '250px',
    boxShadow: '2px 4px 13px lightgray',
    borderRadius: '13px'
  }

  const type = gray ? 'gray' : 'color';

  const handleClick = () => selectCard({ color, gray });

  return (
    <img
      src={`client/assets/${type}-cards/${color}.png`}
      style={style}
      onClick={handleClick}
    />
  );
};

export default Card;