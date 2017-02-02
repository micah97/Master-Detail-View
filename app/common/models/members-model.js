angular.module('eggly.models.members', [

])
  .service('members', function membersService($http, $q) {
    var URLS = {
        FETCH: 'data/members.json'
      },
      members,
      membersModel = this;

    function extract(result) {
      return result.data;
    }

    function cachemembers(result) {
      members = extract(result);
      return members;
    }

    membersModel.getmembers = function () {
      return (members) ? $q.when(members) : $http.get(URLS.FETCH).then(cachemembers);
    };

    function findmember(memberId) {
      return _.find(members, function (member) {
        return member.id === parseInt(memberId, 10);
      })
    }

    membersModel.getmemberById = function (memberId) {
      var deferred = $q.defer();
      if (members) {
        deferred.resolve(findmember(memberId))
      } else {
        membersModel.getmembers().then(function () {
          deferred.resolve(findmember(memberId))
        })
      }
      return deferred.promise;
    };

    membersModel.createmember = function (member) {
      member.id = members.length;
      members.push(member);
    };

    membersModel.updatemember = function (member) {
      var index = _.findIndex(members, function (b) {
        return b.id == member.id
      });
      members[index] = member;
    };

    membersModel.deletemember = function (member) {
      _.remove(members, function (b) {
        return b.id == member.id;
      });
    };

    membersModel.getmembersForclub = function (club) {
      _.filter(members, function (b) {
        return b.club == club;
      });
    };
  })
;