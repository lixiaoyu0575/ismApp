"use strict";

angular.module("app").controller("traditionalShiliaoController", ["traMedical","medicalKnowledgeModal","$scope","$rootScope","$state",function(
  traMedical,medicalKnowledgeModal,$scope,$rootScope,$state, $location) {

    console.log("traditionalShiliaoController start!!!");
    console.log("traditionalTuinanController start!!!");
    $scope.name = "药膳食疗";
    $scope.medicalTree = {};
    $scope.traSearchTree = {};
    $scope.vm = {};
    $rootScope.pageLoading = true;
    traMedical.getAllList().then(function (res) {
        $rootScope.pageLoading = false;
        $scope.medicalTree  = res["Results"]["Main"];
        $scope.traSearchTree = $scope.medicalTree["药膳食疗"];
        console.log($scope.traSearchTree);
    });
    $scope.class1 = "药膳食疗";
    $scope.class2 = "治病常用药酒";
    $scope.class3 = "";
    $scope.class4 = "";
    $scope.vm = {};
    $scope.vm.items = [];
    $scope.vm.columns = [
      { label: "名称"},
      { label: "一级类别"},
      { label: "二级类别"},
      { label: "三级类别"},
      { label: "四级类别"}
    ];
     //分页参数 
    $scope.vm.pageSize = 15;
    $scope.vm.pageNumber = 0;
    $scope.vm.totalNumber = 0;
    $scope.vm.pp = 1;
    $scope.vm.pageList = [
        {
            label:"首页",
            diaplay:"disabled",

        },{
            label:"上一页",
            diaplay:"disabled",

        },{
            label:"下一页",
            diaplay:"disabled",

        },{
            label:"末页",
            diaplay:"disabled",

        }
    ];
    $scope.gridMouseClick = function (Zid) {
            traMedical.getDetails(Zid).then(function (res) {
                $rootScope.pageLoading = false;
                $scope.datails = res.Results.Main;
                $scope.Name = res.Results.Name;
                $("#myModal").modal("show");
            });
        };

    $scope.showdetails=function(type,id){
        if(!type||!id){
            return;
        }
        console.log("yeah");
        medicalKnowledgeModal.generateModal();
        medicalKnowledgeModal.triggerModal(type,id);
    };

     $scope.showlevel4 = function (class1,class2,class3,class4,class5) {
            $scope.class2 = class2;
            $scope.class3 = class3;
            $scope.class4 = class4;
            $scope.vm.pageNumber = 0;
            $scope.vm.pp = 1;
            traMedical.getZhongyilist(class1, class2, class3,
            class4, "", $scope.vm.pageSize, $scope.vm.pageNumber).then(function (res) {
                console.log(res);
                $rootScope.pageLoading = false;
                if (res.Results !== "" && res.Results !== undefined) {
                    $scope.vm.items = [];
                    $scope.vm.totalNumber = res.Total_Zhongyi_Count;
                    $scope.vm.pp = parseInt($scope.vm.totalNumber / $scope.vm.pageSize) +1;
                    for (var i in res.Results) {
                        var data = {};
                        data["Zid"] = res.Results[i][0].Zid;
                        data["Name"] = res.Results[i][1].Name;
                        data["Class1"] = tansOverview(res.Results[i][2].Class1);
                        data["Class2"] = tansOverview(res.Results[i][3].Class2);
                        data["Class3"] = tansOverview(res.Results[i][4].Class3);
                        data["Class4"] = tansOverview(res.Results[i][5].Class4);
                        $scope.vm.items.push(data);
                    }
                }else {
                    console.log("get data failer");
                }
            },function(error){
                $rootScope.pageLoading = false;
                console.log("请求数据出错！！！");
            });
        };
    $scope.showlevel4($scope.class1, $scope.class2, $scope.class3, $scope.class4,"");
    // trans overview
    function tansOverview(ove){
        if(ove == "overview"){
            return "概述";
        } else{
            return ove;
        }
    }
    // page function
    $scope.pages = function (type) {
        if(type == 0) {
            $scope.vm.pageNumber = 0;
        }else if(type == 1){
            if($scope.vm.pageNumber <= 0){
                $scope.vm.pageNumber = 0;
            }else{
                $scope.vm.pageNumber = $scope.vm.pageNumber - 1;
            }
        }else if(type == 2){
            if($scope.vm.pageNumber >= parseInt($scope.vm.totalNumber /$scope.vm.pageSize)){
                $scope.vm.pageNumber = parseInt($scope.vm.totalNumber /$scope.vm.pageSize);
            }else{
                $scope.vm.pageNumber = $scope.vm.pageNumber + 1;
            }
        }else if(type == 3){
            $scope.vm.pageNumber = parseInt($scope.vm.totalNumber /$scope.vm.pageSize);
        }
        traMedical.getZhongyilist($scope.class1, $scope.class2, $scope.class3,
        $scope.class4, "", $scope.vm.pageSize, $scope.vm.pageNumber).then(function (res) {
            console.log(res);
            $rootScope.pageLoading = false;
            if (res.Results !== "" && res.Results !== undefined) {
                $scope.vm.items = [];
                $scope.vm.totalNumber = res.Total_Zhongyi_Count;
                for (var i in res.Results) {
                    var data = {};
                    data["Zid"] = res.Results[i][0].Zid;
                    data["Name"] = res.Results[i][1].Name;
                    data["Class1"] = tansOverview(res.Results[i][2].Class1);
                    data["Class2"] = tansOverview(res.Results[i][3].Class2);
                    data["Class3"] = tansOverview(res.Results[i][4].Class3);
                    data["Class4"] = tansOverview(res.Results[i][5].Class4);
                    $scope.vm.items.push(data);
                }
            }else {
                console.log("get data failer");
            }
        },function(error){
            $rootScope.pageLoading = false;
            console.log("请求数据出错！！！");
        });
    };
}]);