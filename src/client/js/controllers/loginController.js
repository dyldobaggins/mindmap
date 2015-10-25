app.controller("loginController", function($scope, Facebook){
	$scope.loggedIn = true;
	$scope.showForm = false;

	$scope.login = function() {
      if(!$scope.loggedIn){
      	Facebook.login(function(response) {
      		$scope.getLoginStatus();

      		
      	});
      }
    };

    $scope.getLoginStatus = function() {
      Facebook.getLoginStatus(function(response) {
        if(response.status === 'connected') {
          $scope.loggedIn = true;
          $scope.showForm = true;
          $scope.me();
        } else {
          $scope.loggedIn = false;
        }
      });
    };


  	$scope.getLoginStatus();

    $scope.me = function() {
      Facebook.api('/me', function(response) {
        $scope.user = response;
        $scope.fbUsername = $scope.user.name.toLowerCase().replace(' ', '');
      });
    };

    $scope.$watch(
		function() {
			return Facebook.isReady();
		},
		function(newVal) {
			if (newVal)
			$scope.facebookReady = true;
		}
	);

});
