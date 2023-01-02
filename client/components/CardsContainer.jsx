import React, { useState } from 'react';
import Card from './Card.jsx';
import CardDetails from './CardDetails.jsx';

// TODO - move styling into separate style sheet
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
    paddingTop: '10px',
    filter: !currentCard ? '' : 'blur(1.5px)',
  };

  const cards = colorProgress.map(({ color, code, progress}) => 
    <Card
      key={color}
      color={color}
      gray={progress < 100}
      selectCard={() => selectCard({ color, code, progress })}
    />
  );

  return (
    <div onClick={unselectCard}>
      {currentCard && <CardDetails colorDetails={currentCard} />}
      <div style={style}>
        {cards}
      </div>
    </div>
  );
};

export default CardsContainer;