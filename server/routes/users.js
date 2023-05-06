const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/current', usersController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post(
  '/login',
  usersController.verifyUser,
  usersController.loginUser,
  (req, res) => res.status(200).json(res.locals.user)
);

router.post('/logout', usersController.logoutUser, (req, res) => {
  return res.sendStatus(200);
});

router.patch(
  '/:userID/:color',
  usersController.updateUserProgress,
  (req, res) => {
    return res.status(200).json(res.locals.updatedUser);
  }
);

module.exports = router;
