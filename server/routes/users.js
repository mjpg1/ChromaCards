const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/:username', usersController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post('/', usersController.createUser, (req, res) => {
  return res.status(201).json(res.locals.user);
});

router.patch('/:color', usersController.updateUserProgress, (req, res) => {
  return res.status(200).json(res.locals.updatedUser);
});

// TODO - add signup and login routes (and get rid of login router)

module.exports = router;
