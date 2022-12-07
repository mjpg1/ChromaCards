import React from 'react';
import Card from './Card.jsx';

const CardsContainer = ({ colors }) => {
  const cards = colors.map(color => <Card color={color} />);
  return (
    <div>
      {cards}
    </div>
  );
};

export default CardsContainer;