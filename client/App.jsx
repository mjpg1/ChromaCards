import React from 'react';
import CardsContainer from './components/CardsContainer.jsx';

// const colors = [
//   'absinthe', 'ash', 'baker-miller_pink', 'bistre', 'bubblegum_pink', 'cadet_gray',
//   'cerise', 'chartreuse', 'chrome_yellow', 'cinnabar', 'cochineal', 'cream',
//   'egyptian_blue', 'fallow', 'gamboge', 'gold', 'ham_pink', 'heliotrope', 'honeydew',
//   'imperial_yellow', 'jungle_green', 'lime_green', 'mahogany', 'mauve', 'mountbatten_pink',
//   'mustard', 'neon_green', 'peach_pink', 'prussian_blue', 'saffron', 'scarlet', 'sea_foam',
//   'shocking_pink', 'taupe', 'tyrian_purple', 'umber', 'uranian_blue', 'violet', 'viridian',
//   'xanadu'
// ];

// const colorProgress = colors.map(color => ({ color, progress: 0 }));

const colors = [
  ['absinthe', '#E0E046'], ['ash', '#748484'], ['baker-miller_pink', '#EA8CAA'],
  ['bistre', '#B7784E'], ['bubblegum_pink', '#EA477D'], ['cadet_gray', '#4A5868'],
  ['cerise', '#C12967'], ['chartreuse', '#99A53F'], ['chrome_yellow', '#F4A416'],
  ['cinnabar', '#BF2B2B'], ['cochineal', '#F21700'], ['cream', '#EFD0BF'],
  ['egyptian_blue', '#2B6EBF'], ['fallow', '#DBB477'], ['gamboge', '#DB8128'],
  ['gold', '#AD9727'], ['ham_pink', '#DB6158'], ['heliotrope', '#B776DD'],
  ['honeydew', '#50994D'], ['imperial_yellow', '#EFBA0F'], ['jungle_green', '#388426'],
  ['lime_green', '#097053'], ['mahogany', '#9E5A2D'], ['mauve', '#874089'],
  ['mountbatten_pink', '#D38D96'], ['mustard', '#F4BA14'], ['neon_green', '#45DB2A'],
  ['peach_pink', '#E8604D'], ['prussian_blue', '#261E96'], ['saffron', '#D37E0D'],
  ['scarlet', '#C90E0E'], ['sea_foam', '#35E5DC'], ['shocking_pink', '#F20A5E'],
  ['taupe', '#896860'], ['tyrian_purple', '#891D2D'], ['umber', '#9B6123'],
  ['uranian_blue', '#20B4E2'], ['violet', '#9F29D6'], ['viridian', '#38968D'],
  ['xanadu', '#526856']
];

const colorProgress = colors.map(([color, code]) => ({ color, code, progress: 0 }));

const App = () => {
  return (
    <div>
      <CardsContainer colorProgress={colorProgress} />
    </div>
  );
};

export default App;