var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var URL = require('url-parse');
var cheerio = require('cheerio');

var Comment = require('../models/Comment.js');
var Article = require('../models/Article.js');


// handles relative href values
var START_URL = "http://www.foxnews.com/sports.html";
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;

router.get('/', function(req, res) {
  res.redirect('/scrape');
});

router.get('/scrape', function(req, res) {

  request('http://www.foxnews.com/sports.html', function(error, response, html) {

    var $ = cheerio.load(html);
    var resultsArray = [];

    $('h3').each(function(i, element) {

				var result = {};

				result.title = $(this).children('a').text();
				result.link = baseUrl + $(this).children('a').attr('href');

        resultsArray.push(result);

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
    var handleObj = {articles: resultsArray};
    console.log(handleObj);
    res.render('index.handlebars', handleObj);
  });
});

router.post('/submit', function(req, res) {
  console.log(req.body);
  // insert the note into the notes collection
  db.Comment.insert(req.body, function(err, saved) {
    // log any errors
    if (err) {
      console.log(err);
    }
    // otherwise, send the note back to the browser.
    // this will fire off the success function of the ajax request
    else {
      res.send(saved);
    }
  });
});


module.exports = router;
