// Define the 'employeeApp' module
angular.module('employeeApp', [
    'employeeList',
    'alert',
    'ngDialog'
]);

// Define a global alerting dialog,
// which can be called by system.alert(content)
angular.module('employeeApp').service("system", ['ngDialog',
    function(ngDialog) {
        this.alert = function(content) {
            var dialog = ngDialog.open({
                template: 'src/alert/alert.template.html',
                controller: ["$scope", function($scope) {
                    $scope.content = content;
                }]
            });
            return dialog.closePromise;
        };
    }
]);