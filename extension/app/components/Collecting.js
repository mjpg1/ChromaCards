import React from 'react';
import hex2deltaE from '../../../utils/colorConversion';
import colors from '../../../colors';

const Collecting = ({ user }) => {
  const startEyedropper = () => {
    const eyedropper = new EyeDropper();
    eyedropper
      .open()
      .then((result) => {
        console.log('clicked: ', result.sRGBHex);
        for (let [color, hex] of colors) {
          if (hex2deltaE(result.sRGBHex, hex) <= 10) {
            console.log('match: ', color);
          }
        }
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
