app.controller("mainController", ['$scope', '$window', function($scope, $window){

	$scope.user = "";

	$scope.set = function(newUser){
		this.user = newUser;
	};

	$scope.fid = $window.fid;

}]);
