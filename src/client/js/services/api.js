app.service('api', function($q, Restangular) {
    return {
      getUserFromId: function(id, promiseFlag, cb){
        var promise = Restangular.one('user', id).get();
        if(promiseFlag) return promise;
        else {
          promise.then(function(user){
            cb(user);
          });
        }
      },
      getMap: function (username, promiseFlag) {
        var promise = Restangular.one('user', username).customGET('map');
        if(promiseFlag) return promise;
        else {
          promise.then(function(map){
            return map;
          });
        }
      }
    };
  }
);
