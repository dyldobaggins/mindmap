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

	.state('userPage', {
		url: '/user/:user',
		controller: 'userController',
		templateUrl: 'views/user.tpl.html'	
	});

});

//facebook

 (function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

var fid = "";
function statusChangeCallback(response) {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      // console.log("fb", FB);
      document.getElementById('status').innerHTML = JSON.stringify(response);
      

    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
	  statusChangeCallback(response);
	});
}

$(document).ready(function(){
	window.fbAsyncInit = function() {
		FB.init({
		appId      : '1670710456508835',
		cookie     : true,  // enable cookies to allow the server to access 
		                    // the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.2' // use version 2.2
		});

		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
		});

	 //    FB.api('/me', function(response) {
		//     console.log(JSON.stringify(response));
		// });
	};
});



// function testAPI() {
// 	console.log('Welcome!  Fetching your information.... ');
// 	FB.api('/me', function(response) {
// 	  console.log('Successful login for: ' + response.name);
// 	  document.getElementById('status').innerHTML =
// 	    'Thanks for logging in, ' + response.name + '!';
// 	});
// }