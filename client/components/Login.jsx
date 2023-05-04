import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ handleLogin }) => {
  return (
    <GoogleLogin
      onSuccess={handleLogin}
      onError={(err) => console.log(err)}
    />
  );
};

export default Login;
