/**
 * https://www.youtube.com/watch?v=NxHVnK00Q6k
 * https://www.youtube.com/watch?v=D5At7vjVmJs
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
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
