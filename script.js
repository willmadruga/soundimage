var app = angular.module('ImageSound', ['spotify']);

app.controller('MainController', ['$scope', 'Spotify', function ($scope, Spotify) {

	// testing...
	Spotify.getCategoryPlaylists('tag-name-here').then(function (data) {
  		console.log(data);
	})
 
}]);