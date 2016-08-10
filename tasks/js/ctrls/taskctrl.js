
angular.module('data', []);

(function () {
    'use strict'
    angular.module('data', []).controller('TasksCtrl',[TasksCtrl]);

    function TasksCtrl () {
        var self = this;
        self.tasks = [];
        self.block = 'temp/block.html';
        self.DisplayAdd = false;

        self.addtask = function () {

            self.tasks.push({
                amount: self.itemAmount,
                name: self.itemName,
                made: false
            });

            self.itemAmount = "";
            self.itemName = "";
            self.DisplayAdd = false;
        };

        self.deletetask = function (index) {
            self.tasks.splice(index, 1);
        };

        self.tablelist = function (e) {
            self.block = e ;
        };
        self.showAdd = function () {
            self.DisplayAdd = true;
        };
    }
}())
