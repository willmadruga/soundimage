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
        sdk_key: 'DO NOT COMMIT YOUR SDK KEY !!!!!!!!!!!!!!!!!!!!!!!'
      });
      // _______________ DO NOT COMMIT YOUR SDK KEY !!!!!!!!!!!!!!!!!!!!!!!
    });

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
    
    $scope.getBackground = function() {
      
      _500px.api('/photos', { feature: 'popular', page: 1 }, function (response) {
        if (response.success) {
          
          var baseUrl = 'https://500px.com';
          var targetUrl = 'https://drscdn.500px.org/photo/';
          var photo = response.data.photos[0];
          var resultPageUrl = baseUrl + photo.url;
          
          $http.get(resultPageUrl).then(
            function(res) {
              var data = res.data;
              console.log(data);
              var startIndex = data.search(targetUrl);
              var imgSrcStart = data.substr(startIndex);
              var endIndex = imgSrcStart.search("'");
              var imgUrl = imgSrcStart.substr(0, endIndex);
              document.body.background = imgUrl;
            }
          );
          
        } else {
          console.log(response);
        }
      });
      
    }
    
  }]);