(function () {
    'use strict'
     angular
        .module('data')
        .controller('MainCtrl', ['$http', MainCtrl]);
            function MainCtrl ($http) {
                var self = this;
                function Getdata() {
                    $http.get('http://localhost:3333/entry/')
                    .success(function(data, status, headers, config) {
                        self.alldata = data;
                    })
                    .error(function(data, status, headers, config) {
                        console.log('Error');
                    });
                }

                Getdata();

                self.message = '';

                self.deletedata = function(ide){
                    var del = {
                        "EntryId": ide
                    };
                    $http({
                        method: 'DELETE',
                        url: 'http://localhost:3333/entry/',
                        data: { "EntryId": ide },
                        headers: { 'Content-type': 'application/json' }

                    }).then(function successCallback(response) {
                        self.message ='Succes';
                        console.log(response);
                    }, function errorCallback(response) {
                        console.log(response);
                    });

                };

            }
}())
