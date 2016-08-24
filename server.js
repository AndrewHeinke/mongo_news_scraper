var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/fantasyNewsScraper');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var Comment = require('./models/Comment.js');
var Article = require('./models/Article.js');


app.get('/', function(req, res) {
  res.send(index.html);
});




app.listen(3000, function() {
  console.log('App running on port 3000!');
});
