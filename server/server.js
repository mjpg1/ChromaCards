const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
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
app.use(
  cors({
    origin: ['http://localhost:8080', 'http://localhost:3000'],
    credentials: true,
  })
);

// if no valid session provided with req, this middleware creates a new session cookie attached to req.session
// otherwise attaches session cookie from client's request; session data is stored in mongo db
app.set('trust proxy', 1);
app.use(
  session({
    name: 'chromacards-session',
    secret: process.env.SESSION_COOKIE_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // expires after 1 month
    },
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
