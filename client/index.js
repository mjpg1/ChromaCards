import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="23452327072-llnmnes4mcrmd1qmc5e9lg0tj84pga7f.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);

/* TODO
 * use this guide to set up google authentication:
 * https://developers.google.com/identity/gsi/web/guides/overview
 */
