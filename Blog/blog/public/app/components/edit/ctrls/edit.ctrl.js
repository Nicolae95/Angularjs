(function () {
    'use strict'
     angular
        .module('data')
        .controller('EditCtrl', ['$http', '$stateParams', '$state', EditCtrl])
            function EditCtrl ($http, $stateParams, $state) {
                var self = this;

                self.EntryId = $stateParams.EntryId;
                $http.get('http://localhost:3333/entry/' + self.EntryId).then(function (response) {
                    self.newdata = response.data[0];
                });

            //Update data
                self.updatedata = function (met) {
                    $http({
                        method: met,
                        url: 'http://localhost:3333/entry/',
                        data: JSON.stringify(self.newdata),
                        headers: { 'Content-Type': 'application/JSON' }

                    }).then(function successCallback(response) {
                        $state.go('home');
                        self.status ='The article is updated';
                    }, function errorCallback(response) {
                        console.log(response);
                    });
                }
            }
}())
