app.controller("mainController", function($scope){

	$scope.user = "";

	$scope.set = function(newUser){
		this.user = newUser;
	};

});
