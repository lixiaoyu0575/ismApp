/**
 * Created by xiaoyu on 17-2-18.
 */
"use strict";
angular.module("app")
    .controller("searchStartController", searchStartController);
function searchStartController($rootScope, $scope, $location, $http) {
    console.log("searchStartController");
    $scope.isItemsLoading = false;
    $scope.searchString = "";
    $scope.searchItem = function (searachStr) {
        console.log("to search for item");
        $rootScope.curSearchItem = searachStr;
        $location.path("/searching");
    };
    $scope.getStates = function (inputStr) {
        $scope.isItemsLoading = true;
        return $http({
            method: "GET",
            url: "http://202.117.54.88:8000/es/auto/?q={%22QueryString%22:%22" +
                    inputStr + "%22,%22Start%22:0,%22Offset%22:100}"
            // url: "data/searchStartTest.json"
        })
            .then(function (res) {
                $scope.isItemsLoading = false;
                console.log(res);
                console.log(res.data.Results);
                if (res.data.Return === 0) {
                    return res.data.Results;
                }
            });
    };
    $rootScope.pageLoading = false;

}
