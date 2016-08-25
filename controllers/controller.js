var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

var Comment = require('../models/Comment.js');
var Article = require('../models/Article.js');

router.get('/', function(req, res) {
  res.redirect('/scrape');
});

router.get('/scrape', function(req, res) {

  request('http://www.rotoworld.com/headlines/nfl/0/Football-headlines', function(error, response, html) {

    var $ = cheerio.load(html);
    var resultsArray = [];

    $('div.headline').each(function(i, element) {

				var result = {};

				result.title = $(this).children('a').text();
				result.link = $(this).children('a').attr('href');

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

module.exports = router;
