import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginSignupModal = ({ handleCancel, handleLogin }) => {
  return (
    <div className="modal">
      <div id="login-buttons-container">
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        <button id="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginSignupModal;
