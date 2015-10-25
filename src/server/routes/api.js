var Node = require('../models/Node'),
	User = require('../models/User'),
	watson = require('watson-developer-cloud'),
	extract = require('pdf-text-extract'),
	path = require('path'),
	multer  = require('multer');

var upload = multer({ dest: 'uploads/' });

var concept_insights = watson.concept_insights({
  username: '3b3b8bc1-522d-48a9-9be9-0f0f82e3b47c',
  password: 'mRCTfO2GHlou',
  version: 'v2'
});

var getWatsonConcepts = function(text, cb) {
	var concepts = {};
	var watsonParams = {
	  graph: '/graphs/wikipedia/en-20120601',
	  text: text || ""
	};
	concept_insights.graphs.annotateText(watsonParams, function(err, resp) {
	  if (err)
	    cb(false, err);
	  else {
	    resp.annotations.forEach(function(conceptObj) {
	    	concepts[conceptObj.concept.label.toLowerCase().replace(/[^\w\s!?]/g,' ')] = conceptObj.score;
	    });
	    cb(true, concepts);
	  }	  
	});
};

var calcSimilarity = function (personA, personB){
	var prod = 1;
	for(var i = 0; i < personA.length; i++){
		prod = prod * (Math.sqrt(personA[i]*personB[i]) * ( 1 - (Math.abs(personA[i] - personB[i]))));
	}
	return Math.pow(prod, 1/personA.length);
};

var updateNodes = function(newUser, callback){

	User.find({}, function(err, users){
		if(err) return callback(err);
		if(newUser.concepts.length < 1) return callback();

		var nodesToSave = [];

		for(var i in users){

			var a_concepts = [], b_concepts = [];

			if(String(users[i]._id) != String(newUser._id)){
				var matching_concepts = [];

				for(var concept in newUser.concepts){
					if(users[i].concepts[concept]){
						matching_concepts.push(concept);
						a_concepts.push(newUser.concepts[concept]);
						b_concepts.push(users[i].concepts[concept]);
					}
				}

				if(matching_concepts.length > 0){
					var obj = {};
					obj.user = users[i]._id;
					obj.score = calcSimilarity(a_concepts, b_concepts);
					obj.concepts = matching_concepts;
					nodesToSave.push(obj);
				}
				
			}

		}

		if(nodesToSave.length < 1) return callback();

		saveNodes(newUser, nodesToSave, function(err){
			if(err){
				console.log("NOT DONE", err);
			}
			else {
				console.log("DONE");
				callback(true);
				//do something bad
			}
		});

	});
};

var saveNodes = function(newUser, nodes, callback){
	var done = 0;

	//first update new user
	User.findOne({_id: newUser._id}, function(err, found){
		if(err) return callback(err);
		if(!found) return callback("new user not found");

		for(var i in nodes){
			found.userMap[nodes[i].user] = {
				"score": nodes[i].score,
				"concepts": nodes[i].concepts
			};
		}
		found.markModified("userMap");

		found.save(function (err, savedNode) {
		  if (err) return callback("could not save newNode");
		  ++done;
		  if(done == (nodes.length + 1)){
		  	return callback();
		  }
		});
	});

	//update ALL OF THE OTHER USERS
	for(var i in nodes){
		User.findOne({_id: nodes[i].user}, function(err, found){
			found.userMap[newUser._id] = {
				"score": nodes[i].score,
				"concepts": nodes[i].concepts
			};
			
			found.markModified("userMap");

			found.save(function(err, savedNode){
				if(err) return callback(err);
				++done;
				if(done == (nodes.length + 1)){
					return callback();
				}
			});
		});
	}
	
};

var getTextFromPdf = function(filePath, cb) {
	extract(filePath, { splitPages: false }, function (err, text) {
		if (err) {
			console.dir(err);
			return;
		}
		cb(text);
	});
};

module.exports = function (app) {
	app.get('/api', function(req,res){
		res.json("Welcome to the Graph API");
	});

	app.post('/api/newuser', upload.single('document'), function (req, res, next){
		var userName = req.body.username;
		var firstName = req.body.firstname;
		var lastName = req.body.lastname;
		var filePath ='uploads/' + req.file.filename;


		getTextFromPdf(filePath, function(dirty) {
			var text = dirty.replace(/[^\w\s!?]/g,' ');
			console.log(text);
			User.findOne({ 'userName' :  userName }, function(err, user){
				if (err) return res.send(err);	      		
			  	if (user) {
					console.log("User " + userName + " already exists.");
					return res.send(false);
			  	} else {
			  		console.log("Adding new user.");
			  		var newUser = new User();
			      	var concepts = [];
			      	newUser.firstName = req.body.firstname;
			      	newUser.lastName = req.body.lastname;
			      	newUser.userName = userName;
			      	newUser.userMap = {};
			      	getWatsonConcepts(text, function(success, concepts){
			      		if(success) {
			      			console.log(concepts);
			      			newUser.concepts = concepts;
			      			newUser.markModified("userMap");
			      			newUser.save(function(err, newUser) {
						        if (err) {
						          return res.send(err);
						        }				    
						        // res.json(newUser);
						        updateNodes(newUser, function(){
						        	res.json();
						        });
						    });
			      		}
			      		else {
			      			console.log("Error with watson: " + JSON.stringify(concepts));
			      			res.send(false);
			      		}
			      	});
			  	}
			});
		});	
	});

	app.get('/api/user/:user', function(req,res){
		User.findOne({'_id': req.params.user}, function(err, user){
			if(err) return res.send(err);
			console.log(user, JSON.stringify(user));
			if(user) return res.send(user);
			else return res.send();
		});
	});

	app.get("/api/user/:user/map", function(req,res){
		console.log(req.params);
		User.findOne({ 'userName' :  req.params.user }, function(err, user){
			if (err) return res.send(err);
			if (user) {
				return res.send(user.userMap);
			}
			else return res.send();
		});
	});

	

  require('./watson.js')(app);
};
