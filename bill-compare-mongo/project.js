angular.module('project', ['mongolab']).
    config(function($routeProvider) {
        $routeProvider.
          when('/', {controller:ListCtrl, templateUrl:'list.html'}).
          when('/list', {controller:ListCtrl, templateUrl:'list.html'}).
          otherwise({redirectTo:'/list'});
    });

function ListCtrl($scope, Project) {
      $scope.projects = Project.query();
}
