/**
 * https://www.youtube.com/watch?v=NxHVnK00Q6k
 * https://developer.chrome.com/docs/extensions/mv3/tut_oauth/#oauth_client
 * https://developers.google.com/identity/openid-connect/openid-connect
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
