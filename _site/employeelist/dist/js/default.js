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
]);;// Define the 'alert' module
angular.module('alert', []);;// Define the 'employeeList' module
angular.module('employeeList', []);;// Register 'alert' component, along with its associated controller and template
angular.module('alert').component('alert', {
    templateUrl: 'src/alert/alert.template.html',
    controller: function alertController() {
    }
});;// Register 'employeeList' component, along with its associated controller and template
angular.module('employeeList').component('employeeList', {
    templateUrl: 'src/employee-list/employee-list.template.html',
    controller: ['system', function(system) {

        var self = this;

        // The information of Employees
        self.employees = [{
            name: 'Employee A',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ipsum ex, cursus vel dapibus at, consequat at est. Praesent dignissim gravida leo sed efficitur. Etiam sollicitudin vitae turpis in aliquet. Quisque id porttitor lorem. Maecenas mauris leo, tempor sed felis nec, rhoncus tincidunt massa. Aliquam eu dui pellentesque, finibus ipsum quis, imperdiet felis. Aliquam velit est, commodo sit amet sem quis, finibus posuere mi. Cras mattis elit in congue volutpat. Fusce at mollis lacus.',
            others: 'Lorem ipsum dolor sit amet.'
        }, {
            name: 'Employee B',
            bio: 'Nam ultrices odio non ex molestie, nec interdum lacus viverra. Aenean finibus nisi nec rhoncus euismod. Praesent laoreet consequat quam non iaculis. Sed sollicitudin eleifend lectus, a elementum nisi ultrices vel. Pellentesque lacinia velit est, nec scelerisque lectus finibus ac. Suspendisse fringilla fringilla dui. Vestibulum eget lectus at eros ultrices ultricies non a enim. Vivamus ornare magna in vestibulum tincidunt. Vivamus a dolor elit.',
            others: 'Suspendisse sodales ex tellus, non.'
        }, {
            name: 'Employee C',
            bio: 'Etiam massa tortor, scelerisque ut tellus rutrum, venenatis tempor magna. Morbi eu dolor nec dolor tempor egestas in non erat. Duis feugiat vel mi at interdum. Aenean eleifend tortor a semper accumsan. Cras at euismod mi. Nullam pretium, lacus sit amet elementum facilisis, ipsum ligula placerat est, vel porttitor leo tellus et ligula. Proin eu nibh ut turpis luctus feugiat. Etiam non tortor quis tortor luctus sodales. Phasellus mattis cursus leo, eget ullamcorper neque aliquet vitae. Sed sit amet accumsan arcu. Nullam a libero at eros molestie blandit. Ut est erat, dapibus tempus velit auctor, interdum consequat dolor. Cras ac condimentum turpis, sed fermentum velit. Donec quis lorem ultrices, accumsan eros ut, lacinia lectus. Sed consectetur venenatis leo, a accumsan lorem. Sed rhoncus eget risus sit amet tempus.',
            others: 'Maecenas in metus a lectus.'
        }];


        // Click the employee's name to toggle the employee's bio
        // And collapse all others
        self.toggleEmployee = function(employee) {
            //console.log('ng-click: ' + employee.name);
            if (this.isEmployeeShown(employee)) {
                this.currEmployee = null;
            } else {
                this.currEmployee = employee;
            }
        };

        // Return true if the employee's bio is shown
        self.isEmployeeShown = function(employee) {
            //console.log('currEmployee: ' + this.currEmployee);
            //console.log('employee: ' + employee);
            return this.currEmployee === employee;
        };

        // Open the alert after clicking employee's bio
        self.showAlert = function(message) {
            system.alert(message);
        };

    }]
});