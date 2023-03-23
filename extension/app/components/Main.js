import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// TODO - find a better place to locate for easy access from web app and extension
import { getAndSetUser } from '../../../client/reducers/userSlice';

import Login from './Login';
import Collecting from './Collecting';

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAndSetUser());
  }, []);

  return (
    <div>
      {user && <Collecting user={user} />}
      {!user && <Login />}
    </div>
  );
};

export default Main;

/* TODO
 * - login
 * - link to homepage
 * - eyedropper
 * - progress bars
 * - arrows to swipe between "pages" within popup
 */

/** Possible Scenarios:
 * - user is not logged in
 * - user is logged in and...
 *   - has no progress yet
 *   - has a little progress
 *   - has a lot of progress
 */
