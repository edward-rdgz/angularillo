// JavaScript Document
var myApp = angular.module('myApp', ['ui.directives','ui.filters']);

myApp.controller('myAppList', function myAppList($scope) {
  $scope.products = [

    {'name': 'Product 1', 'cat':'Cat 1'},
    {'name': 'Product 2', 'cat':'Cat 2'},
    {'name': 'Product 3', 'cat':'Cat 2'},
    {'name': 'Product 4', 'cat':'Cat 3'},
    {'name': 'Product 5', 'cat':'Cat 3'},
    {'name': 'Product 6', 'cat':'Cat 2'},
  ];
});