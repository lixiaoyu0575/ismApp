/**
 * Created by Wemakefocus on 2016/11/28.
 */
(function () {
    "use strict";

    angular
        .module("app")
        .controller("medicalKnowledgeController", medicalKnowledgeController);
    function medicalKnowledgeController($scope, $rootScope, medicalKnowledgeModal, $http, $location) {
        var mkvm = $scope.mkvm = {},
            mkType = $rootScope.mkCurrentPage,
            sortItem = "",
            orders = [true, false, 0],
            pageStart = 1,
            pageOffset = 10,
            // rowStart = 0,
            rowOffset = 20,
            listRowOffset = 10,
            sortItemString = sortItem,
            totalPages,
            key,
            obj,
            count,
            temp,
            i;
        console.log($rootScope);
        console.log($rootScope.mkCurrentPage);
        $rootScope.pageLoading = false;
        mkvm.currentType = mkType;
        mkvm.isListShow = false;
        mkvm.currentPage = 1;
        mkvm.orders = {};
        mkvm.filters = {};
        mkvm.pages = [];
        mkvm.currentPageIndex = 0;
        initTable();
        mkvm.showdetails = function (type, id) {
            if (!type || !id) {
                return;
            }
            medicalKnowledgeModal.generateModal();
            medicalKnowledgeModal.triggerModal(type, id);
        };
        mkvm.filter = function () {
            console.log(mkvm.filters);
            console.log("to filter");
            mkvm.changePage(1);
            // creatTable((mkvm.currentPage - 1) * rowOffset, rowOffset, sortItemString);
        };
        mkvm.changeOrder = function (key) {
            var ord = mkvm.orders[key],
                k;
            ord = mkvm.orders[key] = orders[(orders.indexOf(ord) + 1) % 3];
            for (k in mkvm.orders) {
                if (mkvm.orders.hasOwnProperty(k) && k !== key) {
                    mkvm.orders[k] = 0;
                }
            }
            if (ord === false) {
                sortItemString = "-" + key;
            } else if (ord === true) {
                sortItemString = key;
            } else if (ord === 0) {
                sortItemString = "";
            } else {
                console.log("sortItemString Error");
            }
            console.log(sortItemString);
            creatTable((mkvm.currentPage - 1) * rowOffset, sortItemString);
        };
        mkvm.changePage = function (page) {
            if (page < 1 || (page > mkvm.totalPages && mkvm.totalPages > 0)) {
                return;
            }
            mkvm.currentPage = page;
            if (mkvm.isListShow === false) {
                creatTable((mkvm.currentPage - 1) * rowOffset, sortItemString);
            } else {
                creatList((mkvm.currentPage - 1) * listRowOffset);
            }
        };

        //search and list
        mkvm.getStates = function (str) {
            mkvm.isItemsLoading = true;
            return $http({
                method:"GET",
                url:'http://59.110.52.133:3010/api/transfer/?q={"path":"/medknowledge/auto","params":{%22QueryString%22:%22' + str + '%22}}'
            })
                .then(function (res) {
                    mkvm.isItemsLoading = false;
                    console.log(res);
                    console.log(res.data.Results);
                    if (res.data.Return === 0) {
                        return res.data.Results;
                    }
                });
        };
        mkvm.searchItem = function () {
            mkvm.tempPage = mkvm.currentPage;
            initList();
            mkvm.isListShow = true;
        };
        mkvm.back2Table = function () {
            mkvm.isListShow = !mkvm.isListShow;
            exchangePage();
            creatTable((mkvm.currentPage - 1) * rowOffset, sortItemString);
        };
        mkvm.back2List = function () {
            mkvm.isListShow = !mkvm.isListShow;
            exchangePage();
            creatList((mkvm.currentPage - 1) * listRowOffset);
        };
        function exchangePage() {
            temp = mkvm.currentPage;
            mkvm.currentPage = mkvm.tempPage;
            mkvm.tempPage = temp;
        }
        function initList() {
            creatList(0, "init");
            mkvm.isItemsLoading = false;
        }
        function creatList(rowStart, state) {
            var url = 'http://59.110.52.133:3010/api/transfer/?q={"path":"/medknowledge/search","params":{%22QueryString%22:%22' + mkvm.queryString +
                '%22,%22Start%22:' + rowStart + ',%22Offset%22:' + listRowOffset + '}}';
            console.log(url);
            mkvm.listItems = [];
            $rootScope.pageLoading = true;
            $http.get(url).then(function (res) {
                var data = res.data,
                    page = mkvm.currentPage;
                console.log(data);
                mkvm.listItems = data.Results;
                page = state === "init" ? 1 : page;
                mkvm.totalPages = Math.ceil(data.Count / listRowOffset);
                console.log(mkvm.totalPages);
                updatePage(page);
                $rootScope.pageLoading = false;
            });
        }
        function initTable() {
            $http.get('http://59.110.52.133:3010/api/transfer/?q={"path":"/medknowledge/list","params":{%22Table%22:%22' + mkType +
                '%22,%22Start%22:0,%22Offset%22:' + rowOffset + ',%22SortItem%22:%22' + sortItem +
                '%22,%22Filter%22:{}}}').then(function (res) {
                var data = res.data;
                mkvm.tableData = data.Results;
                console.log(data);
                mkvm.totalPages = Math.ceil(data.TotalCount / rowOffset);
                // totalPages = mkvm.totalPages;
                obj = mkvm.tableData[0];
                count = 0;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        mkvm.orders[key] = 0;
                        if (count === 1) {
                            mkvm.orders[key] = true;
                        }
                        count++;
                    }
                }
                count = mkvm.totalPages < pageOffset ? mkvm.totalPages : pageOffset;
                for (i = 0; i < count ; i++) {
                    mkvm.pages.push(pageStart + i);
                }
            });
        }
        function creatTable(rowStart, sortItemString) {
            var url = 'http://59.110.52.133:3010/api/transfer/?q={"path":"/medknowledge/list","params":{%22Table%22:%22' + mkType + '%22,%22Start%22:' +
                rowStart + ',%22Offset%22:' + rowOffset + ',%22SortItem%22:%22' + sortItemString + '%22,%22Filter%22:' +
                JSON.stringify(mkvm.filters) + '}}';
            console.log("function creatTable");
            $rootScope.pageLoading = true;
            // mkvm.tableData = [];
            console.log("to get data from:  " + url);
            $http.get(url).then(function (res) {
                var data = res.data,
                    page = mkvm.currentPage;
                $rootScope.pageLoading = false;
                console.log(data);
                mkvm.totalPages = Math.ceil(data.TotalCount / rowOffset);
                console.log(mkvm.totalPages);
                mkvm.tableData = data.Results;
                updatePage(page);
                console.log(mkvm.pages);
            });
        }
        function updatePage(page) {
            var index;
            console.log("updatePage");
            mkvm.pages = [];
            if (page < pageOffset / 2) {
                console.log("page < pageOffset / 2");
                count = mkvm.totalPages < pageOffset ? mkvm.totalPages : pageOffset;
                for (i = 0; i < count; i++) {
                    mkvm.pages.push(1 + i);
                    if (page === 1 + i) {
                        mkvm.currentPageIndex = i;
                    }
                }
            } else if (page > mkvm.totalPages - pageOffset / 2) {
                console.log("page > totalPages - pageOffset / 2");
                count = mkvm.totalPages < pageOffset ? mkvm.totalPages : pageOffset;
                for (i = count; i > 0; i--) {
                    index = mkvm.totalPages - i + 1;
                    mkvm.pages.push(index);
                    if (page === index) {
                        mkvm.currentPageIndex = count - i;
                    }
                }
            } else {
                console.log("page else");
                pageStart = page - Math.ceil(pageOffset / 2) + 1;
                for (i = 0; i < pageOffset ; i++) {
                    index = pageStart + i;
                    mkvm.pages.push(index);
                    if (page === index) {
                        mkvm.currentPageIndex = i;
                    }
                }
            }
        }
    }
})();

