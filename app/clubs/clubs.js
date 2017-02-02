angular.module('clubs', [
  'eggly.models.clubs'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('eggly.clubs', {
        url: '/',
        views: {
          'clubs@': {
            controller: 'clubsCtrl',
            templateUrl: 'app/clubs/clubs.tmpl.html'
          },
          'members@': {
            controller: 'membersCtrl',
            templateUrl: 'app/clubs/members/members.tmpl.html'
          }
        }
      });
  })

  .controller('clubsCtrl', function clubsCtrl($scope, clubs) {
    $scope.getCurrentclubName = clubs.getCurrentclubName;

    clubs.getclubs()
      .then(function (result) {
        $scope.clubs = result;
      });

    $scope.isCurrentclub = function (club) {
      return club.name === $scope.getCurrentclubName();
    }
  })
;