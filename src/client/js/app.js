var app = angular.module('tedx', [
	"ngAnimate",
	"ngTouch"
]);

// routing

//particles
particlesJS.load('starfield', '../assets/particles.json', function() {
  //particles loaded
});

scrollInit = function(){
	var scrollMagicController = new ScrollMagic.Controller();

	var starfield = new ScrollMagic.Scene({duration: '100%'})
		.setTween("#starfield", {top: "-5%"})
		.addTo(scrollMagicController);
	var cta = new ScrollMagic.Scene({duration: '100%'})
		.setTween(".cta", {opacity: 0, marginTop: '-10%'})
		.addTo(scrollMagicController);

	var arrow = new ScrollMagic.Scene({duration: '100%'})
		.setTween(".arrow_down", {opacity: 0, bottom: '200px'})
		.addTo(scrollMagicController);

	var nav = new ScrollMagic.Scene({duration: '100%'})
		.triggerElement("#event")
		.setTween("nav", {opacity: 1})
		.addTo(scrollMagicController);
};
