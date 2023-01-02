import React, { useState, useEffect } from 'react';
import axios from 'axios';

import colors from '../colors';
import CardsContainer from './CardsContainer.jsx';
import Login from './Login.jsx';
import ProgressModal from './ProgressModal.jsx';
import Menu from './Menu.jsx';

/* TODO
** - add signup button and signup modal component
** - add user verification with localStorage and or JWT
** - keep user from opening multiple modals/card details at once
** - in order to be able to access colors from chrome extension, move colors to db
*/

// convert 2D array of color names and codes into array of objects with progress set to 0 (when no user signed in)
const initialColorProgress = colors.map(([color, code]) => ({ color, code, progress: 0 }));

const Main = () => {
  const [loggingIn, setLoggingIn] = useState(false); // if a user is logging in, show the login modal
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [colorProgress, setColorProgress] = useState(initialColorProgress);
  const [checkingProgress, setCheckingProgress] = useState(false); // if a user is checking progress, show progress modal

  // if a user has already logged in (i.e. 'user' in state is not null), retrieve user's color progress
  useEffect(() => {
    const getUserProgress = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users/${user.username}`);
        setColorProgress(initialColorProgress.map(colorInfo => {
          const {color, progress} = colorInfo;
          return color in data.progress ?
            {...colorInfo, progress: data.progress[color] } : colorInfo;
        }))
      } catch (err) {
        console.log(err);
      }
    }

    if (user) getUserProgress();
    else setColorProgress(initialColorProgress);
  }, [user])

  const handleCancelLogin = (e) => {
    e.preventDefault();
    setLoggingIn(false);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      setUser(response.data);
      setLoggingIn(false);
    } catch (err) {
      console.log(err);
    }
    setUsername('');
    setPassword('');
  }

  const handleSignInOut = () => {
    if (user) setUser(null);
    if (!user) setLoggingIn(true);
  };

  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  return (
    <div>
      <Menu
        loggedIn={user !== null}
        setCheckingProgress={setCheckingProgress}
        handleSignInOut={handleSignInOut}
      />
      <CardsContainer colorProgress={colorProgress} />
      {loggingIn &&
        <Login
          handleCancel={handleCancelLogin}
          handleSubmit={handleSubmitLogin}
          updatePassword={updatePassword}
          updateUsername={updateUsername}
          username={username}
          password={password}
        />}
        {checkingProgress &&
          <ProgressModal
            colorProgress={colorProgress}
            handleCloseProgress={() => setCheckingProgress(false)}
          />}
    </div>
  );
};

export default Main;