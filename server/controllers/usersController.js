const User = require('../models/userModel');
const Session = require('../models/sessionModel');
// TODO - currently need separate files for colors as ES6/CommonJS modules
const colors = require('../colors.js');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const usersController = {};

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
    // TODO: verify that this is necessary even with session stored in db
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
  const { userID, id: sessionID } = req.session;

  // currently, when local server is stopped, the userID is no longer appended to the session
  // however the session persists in the db and can be verified against the cookie sent from the client
  if (!userID && sessionID) {
    // if sessionID exists in mongo db store, get user ID from that session
    const userSession = await Session.findById(sessionID);
    if (userSession) {
      userID = JSON.parse(userSession.session).userID;
    } else {
      return next({
        log: 'Error occurred in getUser middleware: no session with given id found in database',
        message: { err: 'Unable to verify user session' },
      });
    }
  }

  try {
    const user = await User.findById(userID).exec();
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: `Error occurred in getUser middleware: ${err}`,
      message: { err: 'Unable to find user' },
    });
  }
};

// TODO - avoid querying db for user twice (currently necessary to see if color is in progress yet)
usersController.updateUserProgress = async (req, res, next) => {
  const { userID, color } = req.params;

  // TODO - for efficient lookup, use a diff/sorted data structure for colors
  if (!colors.find(([name, _]) => name === color)) {
    return next({
      log: 'Error occurred in updateUserProgress middleware: color name not in database',
      status: 400,
      message: { err: 'Invalid color name' },
    });
  }

  try {
    const user = await User.findById(userID).exec();
    if (!user) {
      return next({
        log: 'Error occurred in updateUserProgress middleware: user must be logged in to update',
        status: 401,
        message: { err: 'Must be logged in to update progress' },
      });
    }

    if (!(color in user.progress)) user.progress[color] = 0;
    // TODO - make increments to color progress smaller and/or dependent on color?
    // add 10 to color's progress while keeping progress from surpassing 100
    user.progress[color] = Math.min(user.progress[color] + 10, 100);
    res.locals.updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      { progress: user.progress },
      { new: true }
    );
    return next();
  } catch (err) {
    return next({
      log: `Error occurred in updateUserProgress middleware: ${err}`,
      message: { err: 'Unable to update user progress' },
    });
  }
};

module.exports = usersController;
