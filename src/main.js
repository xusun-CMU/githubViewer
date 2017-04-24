(function () {
    'use strict';

    var main = angular.module('mainView', []);

    var mainController = function ($scope, $http) {

        window.$scope = $scope;

        var onReposComplete = function (response) {
            $scope.repos = response.data;
        };

        var onReposError = function (response) {
            $scope.reposError = "Could not fetch the repos"
        };

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get(response.data.repos_url)
                .then(onReposComplete, onReposError);
        };

        var onUserError = function (response) {
            $scope.userError = "Could not fetch the user";
        };

        $scope.message = "Welcome to use github viewer!";

        var userName = $scope.username;

        $scope.search = function () {
            $http.get("https://api.github.com/users/" + $scope.username)
                .then(onUserComplete, onUserError);
        };
    };

    main.controller("mainController", ['$scope', '$http', mainController]);

}());