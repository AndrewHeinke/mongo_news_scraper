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

app.get('/scrape', function(req, res) {

  request('http://www.rotoworld.com/headlines/nfl/0/Football-headlines', function(error, response, html) {

    var $ = cheerio.load(html);

    $('div.headline').each(function(i, element) {

				var result = {};

				result.title = $(this).children('a').text();
				result.link = $(this).children('a').attr('href');

				var entry = new Article (result);
				entry.save(function(err, doc) {
				  if (err) {
				    console.log(err);
				  }
				  else {
				    console.log(doc);
				  }
				});
    });
  });
  res.send("Scrape Complete");
});

app.listen(3000, function() {
  console.log('App running on port 3000!');
});
