import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

import colors from '../colors';
import CardsContainer from './CardsContainer.jsx';
import LoginSignupModal from './LoginSignupModal.jsx';
import ProgressModal from './ProgressModal.jsx';
import Menu from './Menu.jsx';

/* TODO
 ** - keep user from opening multiple modals/card details at once
 ** - in order to be able to access colors from chrome extension, move colors to db
 ** - instead of signin button, have default page when user isn't logged in include a modal
 **   - introducing new player to game, inviting them to login
 **   - sign in with google button
 */

// convert 2D array of color names and codes into array of objects with progress set to 0 (when no user signed in)
const initialColorProgress = colors.map(([color, code]) => ({
  color,
  code,
  progress: 0,
}));

const Main = () => {
  // show appropriate modals when requested by user
  const [loggingIn, setLoggingIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(false);

  // store data about logged-in user and their color progress (or default if no user logged in)
  const [user, setUser] = useState(null);
  const [colorProgress, setColorProgress] = useState(initialColorProgress);

  // check for logged in user (based on session cookie)
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/current');
        const currentUser = response.data;
        if (currentUser) setUser(currentUser);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [])


  // set color progress based on whether or not a user is logged in
  useEffect(() => {
    if (user) {
      setColorProgress(
        initialColorProgress.map((colorInfo) => {
          const { color, progress } = colorInfo;
          return color in user.progress
            ? { ...colorInfo, progress: user.progress[color] }
            : colorInfo;
        })
      );
    } else {
      setColorProgress(initialColorProgress);
    }
  }, [user]);

  // close modal if a user clicks 'cancel'
  const handleCancel = () => {
    setLoggingIn(false);
    setSigningUp(false);
  };

  // send login request to server (by way of google oauth) and set user data in state accordingly
  const handleLogin = async (res) => {
    const idToken = res.credential;
    try {
      const { data } = await axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        headers: { 'Authorization': `Bearer ${idToken}` }
      });
      setUser(data);
      setLoggingIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  // if signed in, sign user out by setting user in state to null and removing user from local storage
  // else if a user wants to sign in, open the login modal by setting 'loggingIn' to true
  const handleSignInOut = async () => {
    if (user) {
      setUser(null);
      try {
        await axios.post('http://localhost:3000/users/logout');
      } catch (err) {
        console.log(err);
      }
    } else {
      setLoggingIn(true);
    }
  };

  // always render the menu and cards; display login modal or progress modal when opened
  return (
    <div>
      <Menu
        loggedIn={user !== null}
        setCheckingProgress={setCheckingProgress}
        handleSignInOut={handleSignInOut}
      />
      <CardsContainer colorProgress={colorProgress} />
      {(loggingIn || signingUp) && (
        <LoginSignupModal
          loggingIn={loggingIn}
          handleCancel={handleCancel}
          handleLogin={handleLogin}
        />
      )}
      {checkingProgress && (
        <ProgressModal
          colorProgress={colorProgress}
          handleCloseProgress={() => setCheckingProgress(false)}
        />
      )}
    </div>
  );
};

export default Main;
