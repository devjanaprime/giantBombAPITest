var myApp = angular.module( 'myApp', [] );

myApp.controller( 'giantBombController', [ '$scope', '$http', function( $scope, $http ){
  var apiKey = 'a29cff55a0a0390e9e1cf33a873f8f19d4f68fe2';
  $scope.allResults=[];
  $scope.allPlayed=[];
  $scope.allWishlist=[];
  $scope.played = true;
  $scope.search = false;
  $scope.wishlist = false;
  $scope.state = 0;

  $scope.addToPlayed = function( fromList, index ){
    console.log( 'in addToPlayed', fromList, index );
    if( fromList == 0 ){
      // from search
      $scope.allPlayed.push( $scope.allResults[ index ] );
      $scope.allResults.splice( index, 1 );
    }
    else if( fromList == 1 ){
      //from wishlist
      $scope.allPlayed.push( $scope.allWishlist[ index ] );
      $scope.allWishlist.splice( index, 1 );
    }
  };

  $scope.addToWishlist = function( index ){
    console.log( 'in addToWishlist: ' + index );
    // can only happen from search
    $scope.allWishlist.push( $scope.allResults[ index ] );
    $scope.allResults.splice( index, 1 );
  };

  $scope.clearSearch = function( index ){
    console.log( 'in clearSearch' );
    $scope.allResults=[];
  };

  $scope.findGame = function(){
    // empty all results
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
    });
  };

  $scope.pageState = function( stateNum ){
    if( stateNum == 0 ){
      $scope.played = true;
      $scope.search = false;
      $scope.wishlist = false;
    }
    else if( stateNum == 1 ){
      $scope.played = false;
      $scope.search = true;
      $scope.wishlist = false;
    }
    else if( stateNum == 2 ){
      $scope.played = false;
      $scope.search = false;
      $scope.wishlist = true;
    }
    else {
      $scope.played = true;
      $scope.search = false;
      $scope.wishlist = false;
    }
  };

  $scope.removeFromWishlist = function( index ){
    console.log( 'in removeFromList:', index );
    $scope.allWishlist.splice( index, 1 );
  };
}]);
