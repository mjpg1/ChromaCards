import React from 'react';
import Card from './Card.jsx';
import CardDetails from './CardDetails.jsx';

const CardsContainer = ({ colorProgress }) => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '40px',
    paddingTop: '20px',
    filter: 'blur(2px)' // IF CARD DETAIL IS NOT NONE
  };

  const cards = colorProgress.map(({color, progress}) => 
    <Card color={color} gray={progress < 100} />
  );

  return (
    <div>
      <CardDetails color={'saffron'} gray={false} />
      <div style={style}>
        {cards}
      </div>
    </div>
  );
};

export default CardsContainer;