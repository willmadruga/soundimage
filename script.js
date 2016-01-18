/* global _500px */
/* global angular */
angular
	.module('ImageSound', [])
	.config(function($sceProvider) {
		$sceProvider.enabled(false);
	})
  .controller('MainController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    // similar to jQuery document.ready
    $timeout(function(){
      
      // _______________ DO NOT COMMIT YOUR SDK KEY !!!!!!!!!!!!!!!!!!!!!!!
      _500px.init({ 
        sdk_key: ''
      });
      // _______________ DO NOT COMMIT YOUR SDK KEY !!!!!!!!!!!!!!!!!!!!!!!
    });

    hide('#playlistHider'); // this toggle starts hidden
    
    // show/hide the playlist
    $scope.showHidePlaylist = function() {
      $scope.showSongs = !$scope.showSongs;
    };

    var searchSpotifyTag = function(searchTag) {
      var spotifyWebserviceUrl = 'https://api.spotify.com/v1/search?q=' + searchTag + '&type=playlist';
      $http.get(spotifyWebserviceUrl).then(
        function(res) {

          var urls = [];
            res.data.playlists.items.forEach(function(e, i) {
              if (i <= 10) { // use first 10s only.
                urls.push('https://embed.spotify.com/?uri=' + e.uri);
              }
            });
          $scope.trackUrls = urls;
          
          show('#playlistHider');
          $scope.showHidePlaylist(); // toggle playlist
          
        },
        function(error) {
          console.log(error);
        }
      )
    };
    
    $scope.getBackground = function(searchTag) {
      _500px.api('/photos/search', { tag: searchTag, page: 1 }, function (response) {
        if (response.success) {
          
          var baseUrl = 'https://500px.com';
          var targetUrl = 'https://drscdn.500px.org/photo/';
          
          // get a random image out of the result-set.
          var topResults = response.data.photos.length;
          var photo = response.data.photos[getRandom(0, topResults)];
          var resultPageUrl = baseUrl + photo.url;

          // the photo.url they return is a shitty image...
          // let's get hack and get a good one from the user page.          
          $http.get(resultPageUrl).then(
            function(res) {
              var startIndex = res.data.search(targetUrl);
              var imgSrcStart = res.data.substr(startIndex);
              var endIndex = imgSrcStart.search("'");
              var imgUrl = imgSrcStart.substr(0, endIndex);
              document.body.background = imgUrl;
            }
          );
          
          searchSpotifyTag(searchTag);
          hide('#searchBar');
          
        } else {
          console.log(response);
        }
      });
      
    }
    
  }]
);
  

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
var getRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// hide elements
var hide = function(selector) {
  
  var element = document.querySelectorAll(selector);
  element[0].style.display = 'none';
  
};

// show elements
var show = function(selector) {
  
  var element = document.querySelectorAll(selector);
  element[0].style.display = '';
  
};