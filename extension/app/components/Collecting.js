import React from 'react';
import hex2deltaE from '../../../utils/colorConversion';
import colors from '../../../colors.js';
import axios from 'axios';

const Collecting = ({ user }) => {
  const startEyedropper = async () => {
    const eyedropper = new EyeDropper();
    try {
      const clickedColor = await eyedropper.open();
      // TODO - for more efficient matching, could try to sort local color db data structure
      const [colorMatch, _] = colors.find(
        ([color, hex]) => hex2deltaE(clickedColor.sRGBHex, hex) <= 10
      );

      if (colorMatch) {
        const updatedUser = await axios.patch(
          `http://localhost:3000/users/${colorMatch}`
        );
        // TODO - notify user and add throttling mechanism to prevent repetitive clicking of the same spot
        console.log('updated user: ', updatedUser.data);
      } else {
        // TODO - notify user in a more meaningful way
        console.log('no match');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p>Welcome {user.given_name}</p>
      <button onClick={startEyedropper}>eye dropper</button>
    </div>
  );
};

export default Collecting;

/**
 * - eyedropper button that starts the eyedropper api
 * - when user clicks on color, checks color against db of colors
 * - if there's a match, checks user's progress to see if already collected
 * - if not 100% collected, adds to user's progress
 * - notifies the user
 */
