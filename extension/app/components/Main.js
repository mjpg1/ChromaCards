import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';
import Collecting from './Collecting';

const Main = () => {
  const [user, setUser] = useState(null);

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
