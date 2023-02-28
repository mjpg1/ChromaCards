import React from 'react';

const Login = () => {
  const handleLogin = () => {
    chrome.tabs.create({
      url: 'http://localhost:8080/',
      selected: true,
      active: true,
    });
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default Login;
