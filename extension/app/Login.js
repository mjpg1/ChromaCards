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
 * - instead of either of those, should be able to use same login button + endoint as website
 * - use YT vid linked in index.js to finish setting up
 */
