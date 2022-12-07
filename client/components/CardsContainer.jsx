import React from 'react';
import Card from './Card.jsx';

const CardsContainer = ({ colors }) => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '40px',
    paddingTop: '20px'
  };

  const cards = colors.map(color => <Card color={color} />);
  return (
    <div style={style}>
      {cards}
    </div>
  );
};

export default CardsContainer;