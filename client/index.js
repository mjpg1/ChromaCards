import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);

/** (a couple resources on google oauth with extensions)
 * https://www.youtube.com/watch?v=NxHVnK00Q6k
 * https://www.youtube.com/watch?v=D5At7vjVmJs
 */
