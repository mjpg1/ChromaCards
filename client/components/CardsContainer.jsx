import React, { useState } from 'react';
import Card from './Card.jsx';
import CardDetails from './CardDetails.jsx';

const CardsContainer = ({ colorProgress }) => {
  const [currentCard, setCurrentCard] = useState(null);

  const selectCard = (card) => {
    if (!currentCard) setCurrentCard(card);
  };

  const unselectCard = () => {
    if (currentCard) setCurrentCard(null);
  };

  const cards = colorProgress.map(({ color, code, progress }) => (
    <Card
      key={color}
      color={color}
      gray={progress < 100}
      selectCard={() => selectCard({ color, code, progress })}
    />
  ));

  return (
    <div onClick={unselectCard}>
      {currentCard && <CardDetails colorDetails={currentCard} />}
      <div
        id="all-cards-container"
        style={{ filter: !currentCard ? '' : 'blur(1.5px)' }}
      >
        {cards}
      </div>
    </div>
  );
};

export default CardsContainer;
