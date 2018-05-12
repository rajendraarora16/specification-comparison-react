var request = require('request');
var cheerio = require('cheerio');

var contentLoader = {
	get: function (url, callback) {
		var self = this;

		request.get({
			url: url,
			headers: {
				'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
				'Set-Cookie': 'userLanguageML=en'
			}
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(body),
					$specTable = $('.pdp-mod-specification') || [];

				if ($specTable.length === 0) {
					callback(null);
					return;
				}

				callback(self.parseSpec($specTable));
			}

			if (error) {
				callback(null);
			}
		});
	},
	parseSpec: function ($specTable) {
		var $ = cheerio.load($specTable),
		specification = {};

		specification['Product name'] = $specTable.find('h2').text().replace("Specifications of ","");
		
		$specTable.find('.specification-keys li').each(function () {
			var $keyTitle = $(this).find('.key-title');
			var $keyValue = $(this).find('.key-value');
			
			specification[$keyTitle.first().text()] = $keyValue.last().text();
		});

		return specification;
	}
};

module.exports = contentLoader;