import React from 'react';
import CardsContainer from './components/CardsContainer.jsx';

const App = () => {
  return (
    <div>
      <CardsContainer colors={['saffron', 'gold', 'ham_pink']} />
    </div>
  );
};

export default App;