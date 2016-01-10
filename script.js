var Songza = require('songza');
var songza = new Songza({ userAgent: 'myApp/v0.0.1', Origin: 'http://songza.com' });

// just testing...
songza.search.artist('pearl jam', 1).then(function (data) {
		console.log(data);
})
