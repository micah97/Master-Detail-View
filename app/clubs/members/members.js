angular.module('members', [
  'clubs.members.edit',
  'clubs.members.create',
  'eggly.models.clubs',
  'eggly.models.members'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('eggly.clubs.members', {
        url: 'clubs/:club',
        views: {
          'members@': {
            controller: 'membersCtrl',
            templateUrl: 'app/clubs/members/members.tmpl.html'
          }
        }
      })
    ;
  })
  .controller('membersCtrl', function membersCtrl($scope, $stateParams, members, clubs) {
    clubs.setCurrentclub();

    if ($stateParams.club) {
      clubs.getclubByName($stateParams.club).then(function (club) {
        clubs.setCurrentclub(club);
      })
    }

    members.getmembers()
      .then(function (result) {
        $scope.members = result;
      });

    $scope.getCurrentclub = clubs.getCurrentclub;
    $scope.getCurrentclubName = clubs.getCurrentclubName;
    $scope.isSelectedmember = function (memberId) {
      return $stateParams.memberId == memberId;
    };

    $scope.deletemember = members.deletemember;
  })
;

