(function () {
    'use strict';

    var main = angular.module('mainView', []);

    var mainController = function ($scope, github, $anchorScroll, $location) {

        window.$scope = $scope;
        window.github = github;

        var onReposComplete = function (repos) {
            $scope.repos = repos;
        };

        var onReposError = function (repos) {
            $scope.reposError = "Could not fetch the repos";
        };

        var onUserComplete = function (userData) {
            $scope.user = userData;
            github.getRepos(userData)
                .then(onReposComplete, onReposError);
        };

        var onUserError = function (userData) {
            $scope.userError = "Could not fetch the user";
        };

        $scope.message = "Welcome to use github viewer!";

        var userName = $scope.username;

        $scope.search = function () {
            github.getUser($scope.username)
                .then(onUserComplete, onUserError);
            $location.hash('userDetails');
            $anchorScroll();
        };
    };

    main.controller("mainController", ['$scope', 'github', '$anchorScroll', '$location', mainController]);

}());