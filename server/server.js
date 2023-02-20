const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
require('dotenv').config();

const app = express();
const PORT = 3000;

const usersRouter = require('./routes/users');

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('connected to database'))
  .catch((err) => console.log('error conntecting to database: ', err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client'));
app.use(cors());

// if no valid session provided with req, this middleware creates a new session cookie attached to req.session
// otherwise attaches session cookie from client's request
app.use(
  cookieSession({
    name: 'chromacards-session',
    keys: [process.env.SESSION_COOKIE_SECRET],
    maxAge: 7 * 24 * 60 * 60 * 1000, // expires after 1 week
  })
);

app.use('/users', usersRouter);

app.use((req, res) => res.status(404).send('Page not found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
