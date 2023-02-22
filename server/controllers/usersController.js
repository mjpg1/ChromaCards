const User = require('../models/userModel');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const usersController = {};

/*  TODO
 ** - getProgress should get user's progress
 ** - updateProgress should update user's progress
 ** - require authorization tokens for getting and/or updating progress?
 */

usersController.verifyUser = async (req, res, next) => {
  // extract id token from authorization header
  // TODO - add error handling for nonexistent auth header/bearer token
  const idToken = req.headers.authorization.split(' ')[1];

  try {
    // use google auth library's oauth2 client to verify id token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: [process.env.CLIENT_ID, process.env.EXT_CLIENT_ID],
    });
    res.locals.payload = ticket.getPayload();
    return next();
  } catch (err) {
    return next({
      log: `Error occurred in verifyUser middleware: ${err}`,
      status: 401,
      message: { err: 'Unable to verify user' },
    });
  }
};

usersController.loginUser = async (req, res, next) => {
  // extract user info from google oauth verification
  const { sub: googleID, given_name, family_name, email } = res.locals.payload;

  try {
    // see if user with existing google id (sub) exists
    let user = await User.findOne({ googleID }).exec();

    // make a new user if first sign in
    if (!user) {
      user = await User.create({
        googleID,
        email,
        given_name,
        family_name,
        progress: {},
      });
    }

    // create a new session for user by appending their db id to req.session.userID
    req.session.userID = user._id;
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: `Error occurred in loginUser middleware: ${err}`,
      message: { err: 'Unable to login user' },
    });
  }
};

usersController.logoutUser = (req, res, next) => {
  req.session.destroy();
  return next();
};

usersController.getUser = async (req, res, next) => {
  const { userID } = req.session;

  try {
    let user = await User.findById(userID).exec();
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: `Error occurred in getUser middleware: ${err}`,
      message: { err: 'Unable to find user' },
    });
  }
};

usersController.updateUserProgress = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return next({
        log: 'Error occurred in updateUserProgress middleware: user must be logged in to update',
        status: 401,
        message: { err: 'Must be logged in to update progress' },
      });
    }
    // PROBLEM: NO COLOR VALIDATION
    const { color } = req.params;
    if (!(color in user.progress)) {
      user.progress[color] = 0;
    }
    user.progress[color] += 10;
    res.locals.updatedUser = await User.findOneAndUpdate(
      { username },
      { progress: user.progress },
      { new: true }
    );
    const userInDB = await User.findOne({ username });
    return next();
  } catch (err) {
    return next({
      log: `Error occurred in updateUserProgress middleware: ${err}`,
      message: { err: 'Unable to update user progress' },
    });
  }
};

module.exports = usersController;
