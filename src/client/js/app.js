var app = angular.module('graph', [
	'ui.router',
	'restangular',
	'facebook'
]);
//facebook
app.config(function(FacebookProvider) {
     // Set your appId through the setAppId method or
     // use the shortcut in the initialize method directly.
     FacebookProvider.init('1670710456508835');
})


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

//restangular
app.config(function(RestangularProvider){
	RestangularProvider.setBaseUrl("/api");
});

