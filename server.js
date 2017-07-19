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
const app = express();

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

// DB config w/ mongoose
// Heroku URL
// https://vast-fjord-16204.herokuapp.com/
// create an if/else statement for enviroment

// mongoose db
const db = mongoose.connection;
// if mongoose error
db.on('error', function(err) {
	console.log('Mongoose Error: ', err);
});
// mongoose successful connection
db.once('open', function() {
  console.log('Mongoose connected.');
});

// import comment, article models & controllerr & routes
const comment = require('./models/comment.js');
const article = require('./models/article.js');
const router = require('./controllers/controller.js');
// uncomment when i build routes
// app.use('/', router);

// Port Listening
const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on port: ' + port);
});