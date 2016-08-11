(function () {
    'use strict'
     angular
        .module('data')
        .controller('AddCtrl', ['$http','$state', AddCtrl]);
            function AddCtrl ($http, $state) {
                var self = this;
                self.message = '';
                self.adddata = function(){
                    var res = $http.post('http://localhost:3333/entry/', JSON.stringify(self.formData));
                    res.success(function(data, status, headers, config) {
                        self.message ='The article is added to database !!!';
                        $state.go('home');
                    });
                    res.error(function(data, status, headers, config) {
                        alert("failure message");
                    });
                    console.log(self.formData);
                };
            }
}())
