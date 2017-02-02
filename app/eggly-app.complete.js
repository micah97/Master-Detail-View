angular.module('Eggly', [
  'ngAnimate',
  'ui.router',
  'clubs',
  'members'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('eggly', {
        url: '',
        abstract: true
      })
    ;
    $urlRouterProvider.otherwise('/');
  })

;