
function TodoCtrl($scope) {

    $scope.todos = [
    {text:'buy eggs', done:true},
    {text:'pay bills', done:true},
    {text:'get rich', done:false}];

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];

        angular.forEach(oldTodos, function(todo) {
            if(!todo.done) $scope.todos.push(todo);
        });

    };

    $scope.addTodo = function() {
        $scope.todos.push({text:$scope.todoText, done:false});
        $scope.todoText = '';
    };

}
