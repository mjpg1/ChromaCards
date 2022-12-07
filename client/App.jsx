import React from 'react';
import CardsContainer from './components/CardsContainer.jsx';

const colors = [
  'absinthe', 'ash', 'baker-miller_pink', 'bistre', 'bubblegum_pink', 'cadet_gray',
  'cerise', 'chartreuse', 'chrome_yellow', 'cinnabar', 'cochineal', 'cream',
  'egyptian_blue', 'fallow', 'gamboge', 'gold', 'ham_pink', 'heliotrope', 'honeydew',
  'imperial_yellow', 'jungle_green', 'lime_green', 'mahogany', 'mauve', 'mountbatten_pink',
  'mustard', 'neon_green', 'peach_pink', 'prussian_blue', 'saffron', 'scarlet', 'sea_foam',
  'shocking_pink', 'taupe', 'tyrian_purple', 'umber', 'uranian_blue', 'violet', 'viridian',
  'xanadu'
]

const App = () => {
  return (
    <div>
      <CardsContainer colors={colors} />
    </div>
  );
};

export default App;