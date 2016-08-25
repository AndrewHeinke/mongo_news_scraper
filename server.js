var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

app.engine('handlebars', exphbs({
  defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/controller.js');
app.use('/', routes);

var PORT = process.env.PORT || 3333;
app.listen(PORT, function() {
  console.log('App running on port: ' + PORT);
});
