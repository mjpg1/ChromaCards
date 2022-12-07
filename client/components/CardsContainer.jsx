import React, { useState } from 'react';
import Card from './Card.jsx';
import CardDetails from './CardDetails.jsx';

const CardsContainer = ({ colorProgress }) => {
  const [currentCard, setCurrentCard] = useState(null);

  const selectCard = (card) => {
    if (!currentCard) setCurrentCard(card);
  }

  const unselectCard = () => {
    if (currentCard) setCurrentCard(null);
  }

  const style = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '40px',
    paddingTop: '20px',
    filter: !currentCard ? '' : 'blur(2px)' // reduce blur or addition transition?
  };

  const cards = colorProgress.map(({color, progress}) => 
    <Card color={color} gray={progress < 100} selectCard={selectCard} />
  );

  return (
    <div onClick={unselectCard}>
      {currentCard && <CardDetails color={currentCard.color} gray={currentCard.gray} />}
      <div style={style}>
        {cards}
      </div>
    </div>
  );
};

export default CardsContainer;