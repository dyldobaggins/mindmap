app.controller("userController", function($scope, $stateParams){

	console.log($stateParams.user);

	$scope.user = $stateParams.user;

	// $scope.fid = FB.getUserID();
});
