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
