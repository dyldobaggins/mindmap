module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', { title: 'Graph Thang' });
  });

  //graph testing
  app.get('/graph', function(req,res){
  	res.render('graphTest');
  });

  require('./api.js')(app);
};