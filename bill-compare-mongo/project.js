angular.module('project', ['mongolab']).
    config(function($routeProvider) {
        $routeProvider.
          when('/list', {controller:ListCtrl, templateUrl:'list.html'}).
          when('/compare', {controller:BillCtrl, templateUrl:'compare.html'}).
          otherwise({redirectTo:'/compare'});
    });


function ListCtrl($scope, Project) {
      $scope.projects = Project.query();
}

function BillCtrl($scope, Project) {
      var min = 0;
      var max = 10;

      project_rand_one   = Math.floor(Math.random() * (max - min + 1)) + min;
      project_rand_two   = Math.floor(Math.random() * (max - min + 1)) + min;

      $scope.project_one = Project.query({sk: project_rand_one, l: '1'});
      $scope.project_two = Project.query({sk: project_rand_two, l: '1'});
}
