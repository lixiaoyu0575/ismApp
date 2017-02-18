/**
 * Created by xiaoyu on 17-2-18.
 */
"use strict";
angular.module("app")
    .controller("searchStartController", searchStartController);
function searchStartController($rootScope) {
    console.log("searchStartController");
    $rootScope.pageLoading = false;

}
