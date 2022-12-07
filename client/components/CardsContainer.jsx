import React, { useState } from 'react';
import Card from './Card.jsx';
import CardDetails from './CardDetails.jsx';

const CardsContainer = ({ colorProgress }) => {
  const [currentCard, setCurrentCard] = useState(null);

  const selectCard = (card) => setCurrentCard(card);

  const style = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '40px',
    paddingTop: '20px',
    filter: !currentCard ? '' : 'blur(2px)'
  };

  const cards = colorProgress.map(({color, progress}) => 
    <Card color={color} gray={progress < 100} selectCard={selectCard} />
  );

  return (
    <div>
      {currentCard && <CardDetails color={currentCard.color} gray={currentCard.gray} />}
      <div style={style}>
        {cards}
      </div>
    </div>
  );
};

export default CardsContainer;