angular
	.module('ImageSound', [])
	.config(function($sceProvider) {
		$sceProvider.enabled(false);
	})
	.controller('MainController', ['$scope', '$http', function ($scope, $http) {

		var searchTag = $scope.searchTag;
		var spotifyWebserviceUrl = 'http://ws.spotify.com/search/1/';
		var spotifyMetadata = 'track.json';
		var query = '?q=';

		$scope.searchSpotifyTag = function (searchTag) {

			if (searchTag.length > 3) {

				$http.get(spotifyWebserviceUrl + spotifyMetadata + query + searchTag)
				.then(
					function(res) {
						var urls = [];
						 res.data.tracks.forEach(function(e, i) {
							 // just the first ten...
							 if (i <= 10) {
								 urls.push('https://embed.spotify.com/?uri=' + e.href);
							 }
						 });
						$scope.trackUrls = urls;
					},
					function(error) {
						console.log(error);
					}
				);
			}
		};
	}])
;
