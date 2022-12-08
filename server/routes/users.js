const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/', usersController.createUser, (req, res) => {
  return res.status(201).json(res.locals.user);
});

module.exports = router;
