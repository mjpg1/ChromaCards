import React from 'react';
import hex2deltaE from '../../../utils/colorConversion';
import colors from '../../../colors.js';

const Collecting = ({ user }) => {
  const startEyedropper = () => {
    const eyedropper = new EyeDropper();
    // TODO - switch from then chaining to async/await
    eyedropper
      .open()
      .then((result) => {
        const match = colors.find(
          ([color, hex]) => hex2deltaE(result.sRGBHex, hex) <= 10
        );
        // if (match) // send request to server with color and user info to update progress
        // else // notify user if no match found
        // TODO - add throttling mechanism to prevent repetitive clicking of the same spot?
      })
      .catch((err) => console.log(err));
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
