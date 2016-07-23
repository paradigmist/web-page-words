var htmlToText = require('html-to-text')
, request = require('request');

module.exports = function(c,s) {
	request({
	  uri: c.data.url,
	}, function(error, response, body) {
		if (error) {
			if (error.code === 'ENOTFOUND') return s(null, 'page not found');
			else return s(error);
		}

		var count = htmlToText.fromString(body, {
		  wordwrap: null, ignoreHref: true, ignoreImage: true
		}).split(' ').filter(function(x) {
			return x !== '' && x !== '*' && x!=='\n' && !(/^\d+\.$/.test(x));
		}).length;
		s(null, count);
	});
};