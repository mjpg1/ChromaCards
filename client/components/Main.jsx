import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAndSetUser, loginAndSetUser, logoutAndSetUser } from '../reducers/userSlice';
import { setColorProgress } from '../reducers/colorProgressSlice';

import CardsContainer from './CardsContainer.jsx';
import LoginSignupModal from './LoginSignupModal.jsx';
import ProgressModal from './ProgressModal.jsx';
import Menu from './Menu.jsx';

/* TODO
 ** - keep user from opening multiple modals/card details at once
 ** - instead of signin button, have default page when user isn't logged in include a modal
 **   -> introducing new player to game, inviting them to login
 **   -> sign in with google button
 */

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const colorProgress = useSelector(state => state.colorProgress);

  // show appropriate modals when requested by user
  const [loggingIn, setLoggingIn] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(false);

  // check for logged in user (based on session cookie)
  useEffect(() => {
    dispatch(getAndSetUser());
  }, []);

  // set color progress based on whether or not a user is logged in
  useEffect(() => {
    if (user) dispatch(setColorProgress(user.progress))
  }, [user]);

  // close modal if a user clicks 'cancel'
  const handleCancel = () => setLoggingIn(false);

  // send login request to server (by way of google oauth) and set user data in state accordingly
  const handleLogin = async (res) => {
    const idToken = res.credential;
    dispatch(loginAndSetUser(idToken));
    setLoggingIn(false);
  };

  // if signed in, sign user out by setting user in state to null and removing user from local storage
  // else if a user wants to sign in, open the login modal by setting 'loggingIn' to true
  const handleSignInOut = async () => {
    if (user) dispatch(logoutAndSetUser());
    else setLoggingIn(true);
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
      {loggingIn && (
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
