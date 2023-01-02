import React from 'react';

const Menu = ({ loggedIn, setCheckingProgress, handleSignInOut }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '5px' }}>
        {loggedIn && <i className="bi bi-bar-chart-line-fill" onClick={() => setCheckingProgress(true)}></i>}
        <button
          id='login-button'
          onClick={handleSignInOut}
          style={{
            backgroundColor: loggedIn ? '#d4e7ee' : 'rgb(150, 150, 150)',
            border: loggedIn ? '1px solid #918f8f' : '1px solid rgb(20, 20, 20)'
          }}
        >
          {loggedIn ? 'Sign Out' : 'Sign In'}
        </button>
      </div>
  );
};

export default Menu;