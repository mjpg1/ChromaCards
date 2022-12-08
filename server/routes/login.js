const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/', usersController.loginUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

module.exports = router;
