
angular.module('data', []);

(function () {
    'use strict'
    angular.module('data', []).controller('TasksCtrl', ['$http', TasksCtrl])

    function TasksCtrl ($http) {
        var self = this;
        self.block = 'temp/block.html';
        self.DisplayAdd = false;

        function Getdata() {
                $http.get('http://localhost:3300/')
                .success(function(data, status, headers, config) {
                    self.tasks = data;
                })
                .error(function(data, status, headers, config) {
                    console.log('Error');
                });
            }

            Getdata()
        self.tablelist = function (e) {
            self.block = e ;
        };
        self.showAdd = function () {
            self.DisplayAdd = true;
        };


        self.addtask = function(){

            self.taskData = {
                amount: self.itemAmount,
                name: self.itemName,
            };

            console.log(self.taskData);
            var res = $http.post('http://localhost:3300/task/', JSON.stringify(self.taskData));
            res.success(function(data, status, headers, config) {
                Getdata();
            });
            res.error(function(data, status, headers, config) {
                alert("failure message");
            });
        }

        self.deletetask = function(index){
            $http({
                method: 'DELETE',
                url: 'http://localhost:3300/task/',
                data: { "id": index },
                headers: { 'Content-type': 'application/json' }

            }).then(function successCallback(response) {
                Getdata();
            }, function errorCallback(response) {
                alert("Error");
            });
        };

        self.updatemade = function(index){
            console.log(JSON.stringify(self.tasks[index]));
                $http({
                    method: 'PUT',
                    url: 'http://localhost:3300/task/',
                    data: self.tasks[index],
                    headers: { 'Content-Type': 'application/JSON' }
                }).then(function successCallback(response) {
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response);
                });

        };

        }
}())
