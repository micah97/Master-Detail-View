angular.module('eggly.models.clubs', [

])
  .service('clubs', function clubsService($http, $q) {
    var URLS = {
        FETCH: 'http://localhost:3000/clubs'
      },
      clubs,
      currentclub,
      clubsModel = this;

    function extract(result) {
      return result.data;
    }

    function cacheclubs(result) {
      clubs = extract(result);
      return clubs;
    }

    clubsModel.getclubs = function () {
      return (clubs) ? $q.when(clubs) : $http.get(URLS.FETCH).then(cacheclubs);
    };

    clubsModel.getCurrentclub = function () {
      return currentclub;
    };

    clubsModel.getCurrentclubName = function () {
      return currentclub ? currentclub.name : '';
    };

    clubsModel.setCurrentclub = function (club) {
      currentclub = club;
      return currentclub;
    };

    clubsModel.createclub = function (club) {
      club.id = clubs.length;
      clubs.push(club);
    };

    clubsModel.deleteclub = function (club) {
      _.remove(clubs, function (c) {
        return c.id == club.id;
      });
    };

    clubsModel.getclubByName = function (clubName) {
      var deferred = $q.defer();

      function findclub() {
        return _.find(clubs, function (c) {
          return c.name == clubName;
        })
      }

      if (clubs) {
        deferred.resolve(findclub());
      } else {
        clubsModel.getclubs().then(function () {
          deferred.resolve(findclub());
        })
      }

      return deferred.promise;
    };

  })
;
