const express = require('express');
const consign = require('consign');
const expressPromise = require('express-promise');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');


const app = express();

app.use(logger('dev'));
app.use(express.static('./client/public'));
app.use(bodyParser.json());
app.use(expressPromise());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(fileUpload());
//app.use(passport.initialize());

consign()
  .into(app);

// Express will serve up the index.html file
// if it doesn't recognize the route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Padaria do Gerson na porta: ${PORT}`);
});