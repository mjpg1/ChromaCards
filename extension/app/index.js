/**
 * https://www.youtube.com/watch?v=NxHVnK00Q6k
 * https://stackoverflow.com/questions/12262198/logged-in-on-both-a-website-and-a-chrome-extension
 * https://medium.com/the-andela-way/authenticate-your-chrome-extension-user-through-your-web-app-dbdb96224e41
 */

// document.getElementById('start-eyedropper').addEventListener('click', () => {
//   const eyedropper = new EyeDropper();
//   eyedropper
//     .open()
//     .then((result) => {
//       console.log(result.sRGBHex);
//     })
//     .catch((err) => console.log(err));
// });

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.querySelector('#root'));
