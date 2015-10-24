module.exports = function (app) {
  app.get('/api', function(req,res){
  	res.json("Welcome to the Graph API");
  });

  require('./watson.js')(app);
};