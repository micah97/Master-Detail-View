angular.module('clubs.members.create', [
  'eggly.models.members'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('eggly.clubs.members.create', {
        url: '/members/create',
        views: {
          '@eggly.clubs.members': {
            templateUrl: 'app/clubs/members/create/create.member.tmpl.html',
            controller: 'CreatememberCtrl',
          }
        }
      })
    ;
  })

  .controller('CreatememberCtrl', function ($scope, $stateParams, members, $state) {
    $scope.isCreating = false;

    function toggleCreating() {
      $scope.isCreating = !$scope.isCreating;
    }

    function returnTomembers() {
      $state.go('eggly.clubs.members', {
        club: $stateParams.club
      })
    }

    function cancelCreating() {
      $scope.isCreating = false;
      returnTomembers();
    }

    function createmember() {
      members.createmember($scope.newmember);
      returnTomembers();
    }

    function resetForm() {
      $scope.newmember = {
        name: '',
        club: $stateParams.club
      };
    }

    $scope.toggleCreating = toggleCreating;
    $scope.cancelCreating = cancelCreating;
    $scope.createmember = createmember;

    resetForm();
    toggleCreating();
  })
;
