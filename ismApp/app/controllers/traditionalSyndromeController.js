"use strict";
angular.module("app")
  .controller("traditionalSyndromeController", ["$scope","$rootScope","traMedical","medicalKnowledgeModal",
    "$state",function ($scope,$rootScope,traMedical,medicalKnowledgeModal,$state, $location) {

        console.log("traditionalSyndromeController start!!!");
        $scope.name = "辨证论治";
        $scope.medicalTree = {};
        $scope.traSearchTree = {};
        $rootScope.pageLoading = true;
        traMedical.getAllList().then(function (res) {
            $rootScope.pageLoading = false;
            $scope.medicalTree  = res["Results"]["Main"];
            $scope.traSearchTree = $scope.medicalTree["辨证论治"];
        },function(error){
            $rootScope.pageLoading = false;
            console.log("服务器没有响应！！！");
        });
        $scope.vm = {};
        $scope.class1 = "辨证论治";
        $scope.class2 = "中医妇科";
        $scope.class3 = "overview";
        $scope.class4 = "";
        $scope.tableData = [];
        $scope.vm.items = [];
        $scope.vm.columns = [
            // { label: "ID" },
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
        $scope.showlevel4 = function (class2,class3,class4) {
            $scope.class2 = class2;
            $scope.class3 = class3;
            $scope.class4 = class4;
            $scope.vm.pageNumber = 0;
            $scope.vm.pp = 1;
            traMedical.getZhongyilist("辨证论治", class2, class3,
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
        $scope.showlevel4($scope.class2, $scope.class3, $scope.class4); 
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
            traMedical.getZhongyilist("辨证论治", $scope.class2, $scope.class3,
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

          $scope.showdetails=function(type,id){
              if(!type||!id){
                  return;
              }
              console.log("yeah");
              medicalKnowledgeModal.generateModal();
              medicalKnowledgeModal.triggerModal(type,id);
          };

        //click some id
        $scope.gridMouseClick = function (Zid) {
            traMedical.getDetails(Zid).then(function (res) {
                $rootScope.pageLoading = false;
                 //console.log(res);
                $scope.datails = res.Results.Main;
                console.log($scope.datails);
                $scope.Name = res.Results.Name;
                $("#myModal").modal("show");
            },function(error){
                $rootScope.pageLoading = false;
                console.log(error);
            });
        };
       
    }]);