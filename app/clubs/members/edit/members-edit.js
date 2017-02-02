angular.module('clubs.members.edit', [
  'eggly.models.members'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('eggly.clubs.members.edit', {
        url: '/members/:memberId/edit',
        views: {
          '@eggly.clubs.members': {
            templateUrl: 'app/clubs/members/edit/edit.member.tmpl.html',
            controller: 'EditmemberCtrl'
          }
        }
      })
    ;
  })

  .controller('EditmemberCtrl', function ($scope, members, $stateParams, $state) {
    $scope.isEditing = false;

    function returnTomembers() {
      $state.go('eggly.clubs.members', {
        club: $stateParams.club
      })
    }

    members.getmemberById($stateParams.memberId).then(function (member) {
      if (member) {
        $scope.isEditing = true;
        $scope.member = member;
        $scope.editedmember = angular.copy($scope.member);
      } else {
        returnTomembers();
      }
    });

    function toggleEditing() {
      $scope.isEditing = !$scope.isEditing;
    }

    function updatemember() {
      $scope.member = angular.copy($scope.editedmember);
      members.updatemember($scope.editedmember);
      returnTomembers();
    }

    function cancelEditing() {
      $scope.isEditing = false;
      returnTomembers();
    }

    $scope.toggleEditing = toggleEditing;
    $scope.cancelEditing = cancelEditing;
    $scope.updatemember = updatemember;
  })

;
