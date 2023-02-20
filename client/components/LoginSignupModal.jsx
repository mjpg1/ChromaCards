import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const LoginSignupModal = (props) => {
  const handleSuccess = async (res) => {
    const idToken = res.credential;
    try {
      await axios.post(
        'http://localhost:3000/users/login',
        {},
        { headers: { 'Authorization': `Bearer ${idToken}` } }
      );
    } catch (err) {
      console.log(err);
    }
  }
  const handleError = (error) => console.log(error);

  return (
    <div className="modal">
      <div id="login-buttons-container">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        <button id="cancel-button" onClick={props.handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

// const LoginSignupModal = (props) => {
//   return (
//     <div className="modal">
//       <form>
//         <input
//           value={props.username}
//           placeholder="username"
//           onChange={props.updateUsername}
//         />
//         <input
//           type="password"
//           value={props.password}
//           placeholder="password"
//           onChange={props.updatePassword}
//         />
//         <div id="login-buttons-container">
//           <button
//             id="submit-login-button"
//             onClick={props.handleSubmit}
//             onSubmit={props.handleSubmit}
//           >
//             {props.loggingIn ? 'Log In' : 'Sign Up'}
//           </button>
//           <button id="cancel-button" onClick={props.handleCancel}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

export default LoginSignupModal;
