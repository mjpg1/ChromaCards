const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/:username', usersController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post(
  '/login',
  usersController.verifyUser,
  usersController.loginUser,
  (req, res) => {
    // TODO - eventually update to send more user data
    return res.sendStatus(200);
  }
);

router.post('/signup', usersController.createUser, (req, res) => {
  return res.status(201).json(res.locals.user);
});

router.patch('/:color', usersController.updateUserProgress, (req, res) => {
  return res.status(200).json(res.locals.updatedUser);
});

module.exports = router;
