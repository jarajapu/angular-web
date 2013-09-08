angular.module('project', ['mongolab']).
    config(function($routeProvider) {
        $routeProvider.
          when('/list', {controller:ListCtrl, templateUrl:'list.html'}).
          when('/compare', {controller:BillCtrl, templateUrl:'compare.html'}).
          when('/edit/:projectId', {controller:EditCtrl, templateUrl:'detail.html'}).
          when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
          otherwise({redirectTo:'/compare'});
    });


function ListCtrl($scope, Project) {
      $scope.projects = Project.query({l: '0'});
}

function BillCtrl($scope, Project) {
      var min = 0;
      var max = 11;

      project_rand_one   = Math.floor(Math.random() * (max - min + 1)) + min;
      project_rand_two   = Math.floor(Math.random() * (max - min + 1)) + min;

      if (project_rand_one === project_rand_two) {
        project_rand_two   = Math.floor(Math.random() * (max - min + 1)) + min;
      }

      $scope.project_one = Project.query({sk: project_rand_one, l: '1'});
      $scope.project_two = Project.query({sk: project_rand_two, l: '1'});
}

function CreateCtrl($scope, $location, Project) {
      $scope.save = function() {
              Project.save($scope.project, function(project) {
                        $location.path('/edit/' + project._id.$oid);
                            });
              }
}

function EditCtrl($scope, $location, $routeParams, Project) {
      var self = this;

      Project.get({id: $routeParams.projectId}, function(project) {
                self.original = project;
                    $scope.project = new Project(self.original);
                      });

      $scope.isClean = function() {
                  return angular.equals(self.original, $scope.project);
                    }

      $scope.destroy = function() {
                    self.original.destroy(function() {
                              $location.path('/list');
                                  });
                      };

      $scope.save = function() {
                      $scope.project.update(function() {
                                $location.path('/list');
                                    });
                        };
}
