module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', { title: 'Graph Thang' });
  });

  require('./api.js')(app);
};