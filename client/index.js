import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);

/** (a couple resources on google oauth with extensions)
 * https://www.youtube.com/watch?v=NxHVnK00Q6k
 * https://www.youtube.com/watch?v=D5At7vjVmJs
 */
