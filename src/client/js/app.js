var app = angular.module('graph', [
	'ui.router'
]);

// routing

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('login', {
		url: '/',
		templateUrl: 'views/login.tpl.html',
		controller: 'loginController'
	})

	.state('user', {
		url: '/user/:user',
		controller: 'userController',
		templateUrl: 'views/user.tpl.html'	
	});

});