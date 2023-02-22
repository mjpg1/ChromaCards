import React, { useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/current');
        const currentUser = response.data;
        console.log('currentUser: ', currentUser);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

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
