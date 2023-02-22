import React from 'react';

const Menu = ({
  loggedIn,
  setCheckingProgress,
  handleSignInOut,
}) => {
  return (
    <div id="menu">
      {loggedIn && (
        <i
          className="bi bi-bar-chart-line-fill"
          onClick={() => setCheckingProgress(true)}
        ></i>
      )}
      <button
        id="toggle-signin-button"
        onClick={handleSignInOut}
        style={{
          backgroundColor: loggedIn && '#d4e7ee',
          border: loggedIn && '1px solid #918f8f',
          color: loggedIn && '#918f8f',
        }}
      >
        {loggedIn ? 'Sign Out' : 'Sign In'}
      </button>
    </div>
  );
};

export default Menu;
