import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginSignupModal = ({ handleCancel, handleLogin }) => {
  return (
    <div className="modal">
      <GoogleLogin
        onSuccess={handleLogin}
        onError={(err) => console.log(err)}
      />
      <i className="bi bi-x-lg" onClick={handleCancel}></i>
    </div>
  );
};

export default LoginSignupModal;
