var express = require('express');
var app = express();

var contentLoader = require('./contentLoader');

app.get('/load', function (req, res) {
	var url = req.query.url;

	contentLoader.get(url, function (data) {
		res.json(data);
	});
});

app.use(express.static(__dirname +'./../../'));

/**
 * Server conf for production
 */
var server = app.listen(process.env.PORT || 3000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening at http://%s:%s', host, port)

});