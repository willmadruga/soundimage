angular
	.module('ImageSound', [])
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
						console.log(res.data.tracks);
						$scope.tracks = res.data.tracks;
					},
					function(error) {
						console.log(error);
					}
				);
			}
		};
	}]
);
