app.service('api', function($q, Restangular) {
    return {
      getMap: function (username) {
        return Restangular.one('user', username).customGET('map');
      }
    };
  }
);
