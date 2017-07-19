// NPMs
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan'); // debugging

const cheerio = require('cheerio'); 
const request = require('request');

// console.log('Hello World!');

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan & body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to public folder
app.use(express.static("public"));

// Handlerbars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');