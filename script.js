/* global angular */
angular
	.module('ImageSound', [])
	.config(function($sceProvider) {
		$sceProvider.enabled(false);
	})
  .controller('MainController', ['$scope', '$http', function ($scope, $http) {

		$scope.searchSpotifyTag = function (searchTag) {

			if (searchTag.length > 3) {

        var spotifyWebserviceUrl = 'https://api.spotify.com/v1/search?q=' + searchTag + '&type=playlist';
				$http.get(spotifyWebserviceUrl).then(
					function(res) {
            console.log(res);
						var urls = [];
						 res.data.playlists.items.forEach(function(e, i) {
							 if (i <= 10) { // use first 10s only.
								 urls.push('https://embed.spotify.com/?uri=' + e.uri);
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
  }]);