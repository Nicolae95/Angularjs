
angular.module('data', []);

(function () {
    angular.module('data', []).controller('CalculatorCtrl',[CalculatorCtrl]);

    'use strict'
    function CalculatorCtrl () {
        var self = this;
        var calculator = 0;
        var len;
        var words;

        self.sum = function() {
            self.calculator = self.first + self.second;
        }
        self.min = function() {
            self.calculator = self.first - self.second;
        }
        self.prod = function() {
            self.calculator = self.first * self.second;
        }
        self.div = function() {
            self.calculator = self.first / self.second;
        }

        self.textfun = function() {
            self.len = self.text.length ;
            self.words = self.text.split(' ').length;
        }

    }
}())
