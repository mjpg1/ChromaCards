import React, { useState, useEffect } from 'react';
import axios from 'axios';

import colors from '../colors';
import CardsContainer from './CardsContainer.jsx';
import LoginSignupModal from './LoginSignupModal.jsx';
import ProgressModal from './ProgressModal.jsx';
import Menu from './Menu.jsx';

/* TODO
** - keep user from opening multiple modals/card details at once
** - in order to be able to access colors from chrome extension, move colors to db
*/

// convert 2D array of color names and codes into array of objects with progress set to 0 (when no user signed in)
const initialColorProgress = colors.map(([color, code]) => ({ color, code, progress: 0 }));

const Main = () => {
  // show appropriate modals when requested by user
  const [loggingIn, setLoggingIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(false);

  // keep track of username and password inputs when signing up or logging in
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // store data about logged-in user and their color progress (or default if no user logged in)
  const [user, setUser] = useState(null);
  const [colorProgress, setColorProgress] = useState(initialColorProgress);

  // check local storage for logged-in user
  useEffect(() => {
    const currentUser = localStorage.getItem('user');
    if (currentUser) setUser(JSON.parse(currentUser));
  }, []);

  // set color progress based on whether or not a user is logged in
  useEffect(() => {
    if (user) {
      setColorProgress(initialColorProgress.map(colorInfo => {
        const { color, progress } = colorInfo;
        return color in user.progress ?
          { ...colorInfo, progress: user.progress[color] } : colorInfo;
      }));
    } else {
      setColorProgress(initialColorProgress);
    }
  }, [user])

  // close modal if a user clicks 'cancel'
  const handleCancel = (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
    setLoggingIn(false);
    setSigningUp(false);
  };

  // send login request to server when user clicks 'log in' button in login modal
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/login', { username, password });
      setUser(response.data);
      // add user to localStorage so that user stays logged in on refresh
      localStorage.setItem('user', JSON.stringify(response.data));
      setLoggingIn(false);
    } catch (err) {
      console.log(err);
    }
    setUsername('');
    setPassword('');
  }

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/signup', { username, password });
      setUser(response.data);
      // add user to localStorage so that user stays logged in on refresh
      localStorage.setItem('user', JSON.stringify(response.data));
      setSigningUp(false);
    } catch (err) {
      console.log(err);
    }
    setUsername('');
    setPassword('');
  }

  // if signed in, sign user out by setting user in state to null and removing user from local storage
  // else if a user wants to sign in, open the login modal by setting 'loggingIn' to true
  const handleSignInOut = () => {
    if (user) {
      setUser(null);
      localStorage.removeItem('user');
    } else {
      setLoggingIn(true);
    }
  };

  // keep username and password fields in the login modal updated in main state
  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  // always render the menu and cards; display login modal or progress modal when opened
  return (
    <div>
      <Menu
        loggedIn={user !== null}
        setCheckingProgress={setCheckingProgress}
        handleSignInOut={handleSignInOut}
        handleSignUp={() => setSigningUp(true)}
      />
      <CardsContainer colorProgress={colorProgress} />
      {(loggingIn || signingUp) &&
        <LoginSignupModal
          loggingIn={loggingIn}
          handleCancel={handleCancel}
          handleSubmit={loggingIn ? handleSubmitLogin : handleSubmitSignup}
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