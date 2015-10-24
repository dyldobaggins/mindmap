var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
var json = require('express-json');
var bodyParser  = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

module.exports = function (app) {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/../server/views');
	app.set('view engine', 'ejs');
	app.use(morgan('dev'));
	app.use(json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(serveStatic(__dirname + '/../public'));

	mongoose.connect('mongodb://mindmapadmin:mapmymind@ds043714.mongolab.com:43714/mindmapdb');

	if ('development' == app.get('env')) {
		
	}

	if ('production' == app.get('env')) {
		
	}
};