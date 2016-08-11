
(function () {
    'use strict';
    angular
        .module('data')
        .config(routes);
            function routes($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('home', {
                        url: "/",
                        templateUrl : 'app/components/main/temp/main.tpl.html',
                        controller  : 'MainCtrl',
                        controllerAs: 'mainctrl'
                    })
                    .state('add', {
                        url: "/add",
                        templateUrl : 'app/components/add/temps/add.tpl.html',
                        controller  : 'EditCtrl',
                        controllerAs: 'editctrl'
                    })
                    .state('detail', {
                        url: "/detail/:EntryId",
                        templateUrl : 'app/components/detail/temp/detail.tpl.html',
                        controller  : 'DetailCtrl',
                        controllerAs: 'detailctrl'
                    })
                    .state('edit', {
                        url: "/edit/:EntryId",
                        templateUrl : 'app/components/edit/temp/edit.tpl.html',
                        controller  : 'EditCtrl',
                        controllerAs: 'editctrl'
                    })
                    $urlRouterProvider.otherwise("/");
            }
}())
