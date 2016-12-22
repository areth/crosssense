'use strict';

const express = require('express');
const passport = require('passport');
const session = require('express-session');

// Constants
const PORT = 8080;

// App
const app = express();
require('./authentication').init(app);
app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);