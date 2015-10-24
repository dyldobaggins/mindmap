var Node = require('../models/Node'),
	Person = require('../models/Person'),
	watson = require('watson-developer-cloud');

var concept_insights = watson.concept_insights({
  username: '3b3b8bc1-522d-48a9-9be9-0f0f82e3b47c',
  password: 'mRCTfO2GHlou',
  version: 'v2'
});
var getWatsonConcepts = function(text, cb) {
	var concepts = [];
	var watsonParams = {
	  graph: '/graphs/wikipedia/en-20120601',
	  text: text || ""
	};
	concept_insights.graphs.annotateText(watsonParams, function(err, resp) {
	  if (err)
	    cb(false, err);
	  else {
	    resp.annotations.forEach(function(conceptObj) {
	    	var concept = {};
	    	concept.label = conceptObj.concept.label;
	    	concept.score = conceptObj.score;
	    	concepts.push(concept);
	    });
	    console.log(concepts);
	    cb(true, concepts);
	  }	  
	});
};

module.exports = function (app) {
  app.get('/api', function(req,res){
  	res.json("Welcome to the Graph API");
  });

  app.post('/api/newuser', function(req,res){
  	var userName = req.body.userName;

  	Person.findOne({ 'userName' :  userName }, function(err, user){
  		if (err)
          return res.send(err);
      if (user) {
          console.log("User " + userName + " already exists.");
          return res.send(false);
      } else {
      	console.log("Adding new user.");
      	var newPerson = new Person();
      	var concepts = [];
      	newPerson.firstName = req.body.firstName;
      	newPerson.lastName = req.body.lastName;
      	newPerson.userName = userName;
      	getWatsonConcepts(req.body.text, function(success, concepts){
      		if(success) {
      			newPerson.concepts = concepts;
      			newPerson.save(function(err) {
				        if (err) {
				          return res.send(err);
				        }
				        res.json(newPerson);
				    });
      		}
      		else {
      			console.log("we fucked up");
      		}
      	});
      }
  	});
  });

  require('./watson.js')(app);
};
