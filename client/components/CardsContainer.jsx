import React from 'react';
import Card from './Card.jsx';

const CardsContainer = ({ colorProgress }) => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '40px',
    paddingTop: '20px'
  };

  const cards = colorProgress.map(({color, progress}) => 
    <Card color={color} gray={progress < 100} />
  );

  return (
    <div style={style}>
      {cards}
    </div>
  );
};

export default CardsContainer;