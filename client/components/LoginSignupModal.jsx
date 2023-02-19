import React from 'react';

const LoginSignupModal = (props) => {
  return (
    <div className="modal">
      <form>
        <input
          value={props.username}
          placeholder="username"
          onChange={props.updateUsername}
        />
        <input
          type="password"
          value={props.password}
          placeholder="password"
          onChange={props.updatePassword}
        />
        <div id="login-buttons-container">
          <button
            id="submit-login-button"
            onClick={props.handleSubmit}
            onSubmit={props.handleSubmit}
          >
            {props.loggingIn ? 'Log In' : 'Sign Up'}
          </button>
          <button id="cancel-button" onClick={props.handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignupModal;
