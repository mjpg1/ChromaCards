const User = require('../models/userModel');

const usersController = {};

usersController.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && password === user.password) {
      res.locals.user = user;
      return next();
    } else {
      return next({
        log: 'Error occurred in loginUser middleware: incorrect username or password',
        message: { err: 'Incorrect username or password' },
      });
    }
  } catch (err) {
    return next({
      log: `Error occurred in loginUser middleware: ${err}`,
      message: { err: 'Unable to login user' },
    });
  }
};

usersController.getUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (user) {
      res.locals.user = user;
      return next();
    } else {
      return next({
        log: 'Error occurred in getUser middleware: no user found with username',
        message: { err: 'No user found with that username' },
      });
    }
  } catch (err) {
    return next({
      log: `Error occurred in getUser middleware: ${err}`,
      message: { err: 'Unable to find user' },
    });
  }
};

usersController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    res.locals.user = await User.create({ username, password, progress: {} });
    return next();
  } catch (err) {
    return next({
      log: `Error occurred in createUser middleware: ${err}`,
      message: { err: 'Unable to create new user' },
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
    res.locals.updatedUser = await user.save();
    return next();
  } catch (err) {
    return next({
      log: `Error occurred in updateUserProgress middleware: ${err}`,
      message: { err: 'Unable to update user progress' },
    });
  }
};

module.exports = usersController;
