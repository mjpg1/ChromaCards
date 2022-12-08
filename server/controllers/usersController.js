const User = require('../models/userModel');

const usersController = {};

usersController.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user && password === user.password) {
      res.locals.user = user;
      return next();
    } else {
      return next({
        log: 'Error occurred in loginUser middleware, incorrect username or password',
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

usersController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    res.locals.user = await User.create({ username, password });
    return next();
  } catch (err) {
    return next({
      log: `Error occurred in createUser middleware: ${err}`,
      message: { err: 'Unable to create new user' },
    });
  }
};

module.exports = usersController;
