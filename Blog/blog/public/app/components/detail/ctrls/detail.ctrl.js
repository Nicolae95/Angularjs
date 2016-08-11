(function () {
    'use stric';
     angular
        .module('data')
        .controller('DetailCtrl', ['$http','$stateParams', DetailCtrl]);
            function DetailCtrl ($http, $stateParams) {
                var self = this;
                self.EntryId = $stateParams.EntryId;
                $http.get('http://localhost:3333/entry/' + self.EntryId).then(function (response) {
                    self.singledata = response.data[0];
                });
            }
}())
