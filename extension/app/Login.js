import React from 'react';

const Login = () => {
  const handleLogin = () => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      console.log(token);
    });
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default Login;

/* TODO
 * - currently this temporary login button uses getAuthToken, not launchWebAuthFlow
 * - decide which makes more sense for the app
 * - put extension login on hold to setup google oauth with website
 * - finish steps in YT vid linked in index.js
 * - NOTE: may be able to just use this guide instead of all of the above:
 * https://developers.google.com/identity/gsi/web/guides/overview
 */
