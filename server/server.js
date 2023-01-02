const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');

mongoose
  .connect(
    'mongodb+srv://mjpg:bJAMkKLYctWxT93U@cluster0.rkr5r8i.mongodb.net/colorCards?retryWrites=true&w=majority'
  )
  .then(() => console.log('connected to database'))
  .catch((err) => console.log('error conntecting to database: ', err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client'));
app.use(cors());

app.use('/login', loginRouter); // FIXME - combine with usersRouter?
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
