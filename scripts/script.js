var myApp = angular.module( 'myApp', [] );

myApp.controller( 'giantBombController', [ '$scope', '$http', function( $scope, $http ){
  var apiKey = 'a29cff55a0a0390e9e1cf33a873f8f19d4f68fe2';
  $scope.allResults=[];
  $scope.allFavorites=[];

  $scope.addToFavorites = function( index ){
    console.log( 'in addToFavorites: ' + index );
    $scope.allFavorites.push( $scope.allResults[ index ] );
    console.log( $scope.allFavorites );
  };

  $scope.clearSearch = function( index ){
    console.log( 'in clearSearch' );
    $scope.allResults=[];
  };

  $scope.findGame = function(){
    $scope.allResults=[];
    console.log( 'in findGame: ', $scope.searchString );
    var searchURL = 'http://www.giantbomb.com/api/search/?api_key=' + apiKey + '&format=json&query=%22' + $scope.searchString + '%22&resources=game';
    $http({
      method: 'GET',
      url: searchURL
    }).then( function( response ){
      for( var i=0; i< response.data.results.length; i++ ){
        $scope.allResults.push( response.data.results[ i ] );
      }; // end for
      console.log( $scope.allResults );
    });
  };

  $scope.removeFromFavorites = function( index ){
    console.log( 'in removeFromList:', index );
    $scope.allFavorites.splice( index, 1 );
  };
}]);
