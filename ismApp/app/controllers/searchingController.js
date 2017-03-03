/**
 * Created by xiaoyu on 17-2-28.
 */
"use strict";
angular.module("app")
    .controller("searchingController", searchingController);
function searchingController($rootScope, $scope, $http, $location, $compile) {
    var pageStart = 1,
        pageOffset = 10,
        rowOffset = 10,
        count,
        i;
    console.log("searchingController");
    $scope.isListInited = 0;
    $scope.isItemsLoading = false;
    $scope.searchString = $rootScope.curSearchItem || "";
    $scope.timeSelected = {};
    $scope.currentPage = 1;
    $scope.currentPageIndex = 0;
    $scope.pages = [];
    $scope.totalPages = 10000;
    $scope.typeSelected = null;
    // $scope.newsItems = '<font color="#CC0000">官网</font>';
    $scope.searchItem = function (rowStart, searchStr) {
        var typeSelected = $scope.typeSelected || "不限",
            timeSelected;
        console.log(searchStr);
        if (!searchStr) {
            return;
        }
        if ($scope.timeSelected === null) {
            timeSelected = 0;
        }else {
            timeSelected = $scope.timeSelected.value || 0;
        }
        console.log($scope);
        console.log(typeSelected,timeSelected);
        console.log("to search for item");
        $http({
            method: "GET",
            url: "http://202.117.54.88:8000/es/search/?q={%22QueryString%22:%22" + searchStr +
                "%22,%22Start%22:" + rowStart + ",%22Offset%22:" + rowOffset +
                ",%22Filter%22:{%22Time%22:" + timeSelected +
                ",%22Type%22:[%22" + typeSelected + "%22]}}"
        })
            .then(function (res) {
                var data = res.data,
                    page = $scope.currentPage;
                if (data.Return === 0) {
                    console.log(data);
                    $scope.totalPages = Math.ceil(data.Total_counts / rowOffset);
                    count = $scope.totalPages < pageOffset ? $scope.totalPages : pageOffset;
                    if ($scope.isListInited === 0){
                        for (i = 0; i < count ; i++) {
                            $scope.pages.push(pageStart + i);
                        }
                        $scope.isListInited = 1;
                    }else {
                        updatePage(page);
                    }
                    $scope.isItemsLoading = false;
                    console.log(res.data.Results);
                    $scope.newsItems = res.data.Results;
                    $scope.newsItems = getNewsList(res.data.Results);
                    angular.element("#test").html($compile($scope.newsItems)($rootScope));
                }
            });
    };
    $scope.searchItem(0, $scope.searchString);
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
    function getNewsList(newsItems) {
        var html = "",
            i = 0,
            l = newsItems.length;
        for (i = 0; i < l; i++) {
            html += "<dl><a href='" + newsItems[i].Url + "' target='_blank'>" +
                    "<h4><u>" + newsItems[i].Title + "</u></h4></a><dd>" +
                    newsItems[i].Content + "</dd><dd>来源: " +
                    newsItems[i].Website + "</dd><dd>时间: " +
                    newsItems[i].Time + "</dd></dl><br>";
        }
        return html;
    }
    $scope.toAnalyse = function () {
        $location.path("/login");
    };
    $scope.typeFilter = [
        "不限",
        "房产",
        "娱乐",
        "社会",
        "生活",
        "能源",
        "文化",
        "体育",
        "财经",
        "IT",
        "科技",
        "汽车",
        "军事",
        "健康"
    ];
    $scope.timeFilter = [
        {
            label: "不限",
            value: 0
        },
        {
            label: "一天内",
            value: 1
            // value: "inOneDay"
        },
        {
            label: "一周内",
            value: 2
        },
        {
            label: "一个月内",
            value: 3
        }
        // {
        //     label: "一年内",
        //     value: 4
        // }
    ];
    function updatePage(page) {
        var index,
            i;
        console.log("updatePage");
        $scope.pages = [];
        if (page < pageOffset / 2) {
            console.log("page < pageOffset / 2");
            count = $scope.totalPages < pageOffset ? $scope.totalPages : pageOffset;
            for (i = 0; i < count; i++) {
                $scope.pages.push(1 + i);
                if (page === 1 + i) {
                    $scope.currentPageIndex = i;
                }
            }
        } else if (page > $scope.totalPages - pageOffset / 2) {
            console.log("page > totalPages - pageOffset / 2");
            count = $scope.totalPages < pageOffset ? $scope.totalPages : pageOffset;
            for (i = count; i > 0; i--) {
                index = $scope.totalPages - i + 1;
                $scope.pages.push(index);
                if (page === index) {
                    $scope.currentPageIndex = count - i;
                }
            }
        } else {
            console.log("page else");
            pageStart = page - Math.ceil(pageOffset / 2) + 1;
            for (i = 0; i < pageOffset ; i++) {
                index = pageStart + i;
                $scope.pages.push(index);
                if (page === index) {
                    $scope.currentPageIndex = i;
                }
            }
        }
    }
    $scope.changePage = function (page) {
        if (page < 1 || (page > $scope.totalPages && $scope.totalPages > 0)) {
            return;
        }
        $scope.currentPage = page;
        $scope.searchItem(($scope.currentPage - 1) * rowOffset, $scope.searchString);
    };
}
