"use strict";
/*
This module connects to the openFDA API to fetch data on adverse events
It abstracts the specific syntax and nomenclature of the API
*/

angular.module('app')
  .service('Data', function Data($http,$q,$rootScope) {
        return {
             getPatientByID:function (num) {
                var json = {"PID":num};
                json = {
                    "path": "/patientQuery",
                    "params": json
                };
                var resultIds = $http({
                    method:'GET',
                    url: "http://59.110.52.133:3010/api/transfer",
                    // url:'http://59.110.52.133:8000/patientQuery/',
                    params:{'q':JSON.stringify(json)}
                }).then(function (res) {
                    console.log("getPatientByID get Data");
                    console.log(res);
                    if(res.data.Return !== 1){
                        console.log("API returned wrong data");
                    }
                    return res.data;
                });
                return resultIds
            },
            getPid:function (num) {
                var json = {"Cid":num};
                json = {
                    "path": "/usdata/getPatient",
                    "params": json
                };
                var resultIds = $http({
                    method:'GET',
                    url:'http://59.110.52.133:3010/api/transfer',
                    params:{'q':JSON.stringify(json)}
                }).then(function (res) {
                    console.log("getPid get data");
                    console.log(res);
                    return res.data;
                });
                return resultIds
            },
            getSankeyData:function(pid,num){
            
                var json = {};
                json["PID"] = pid;
                json["TOP"]= num||10;
                json = {
                    "path": "/PatientSimilarity",
                    "params": json
                };
                var jsonStr = JSON.stringify(json);
                var canshu={"q":jsonStr};
            console.log(canshu);
                var results=$.ajax({
                    type: "GET",
                    url: 'http://59.110.52.133:3010/api/transfer',
                    data:canshu,
                    dataType: "json",
                    success: function(data){
                        console.log("getSankeyData get data");
                          console.log(data);
                        if(data.return !== 1){
                            console.log("API returned wrong data");
                        }
                        return data;
                    }

                });
                // console.log(results);
                return results;
            },



             getSankeyMedData:function(pid,num){
            
                var json = {};
                json["PID"] = pid;
                json["TOP"]= num||5;
                json = {
                    "path": "/usdata/similarPatientMedication",
                    "params": json
                };
                var jsonStr = JSON.stringify(json);
                var canshu={"q":jsonStr};
            
                var results=$.ajax({
                    type: "GET",
                    url: 'http://59.110.52.133:3010/api/transfer',
                    data:canshu,
                    // headers:{
                    //     "apikey":$rootScope.Authenapikey,
                    //     "token":$rootScope.userToken
                    // },
                    dataType: "json",
                    success: function(data){
                        console.log("get Sankey Med data success");
                          console.log(data);
                        if(data.return !== 0){
                            console.log("API returned wrong data");
                        }
                        return data;
                    }
                });
                return results;
            },
            getNetworkStyle:function () {
                var resultStyle=$http.get("data/style_test.txt").then(function(response){
                    return response.data;
                })
                return resultStyle;
            },
            getNetworkData:function(query) {
                //var json = {"DIDS":["d41311","d42983","d38428"]};
                var json = {"NID":query};
                var results = [], cData = 0, cStyle = 0, crl = 0;
                console.log("getNodesInfo API gets json:");
                console.log(json);
                json = {
                    "path": "/getNodesInfo/",
                    "params": json
                };
                var resultData = $http({
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    // url:' http://59.110.52.133:9999/getNodesInfo/',
                    url: "http://59.110.52.133:3010/api/transfer",
                    //url: ' http://123.56.119.197:8888/getDisRelation/ '
                    data: JSON.stringify(json)
                }).error(function (response) {
                    console.log("getNetwork data error:");
                    console.log(response);
                    //console.log(results);
                    // return response.data;
                }).success(function (response) {
                    console.log("getNetwork data success:");
                    console.log(response);
                    if(response.return !== 0){
                        alert("getNodesInfo API returned wrong data");
                    }
                    //console.log(results);
                    // return response.data;
                });
                //console.log(resultData);
                return resultData;
            },
            getFilterData:function(condition) {
                //var json = {"DIDS":["d41311","d42983","d38428"]};
                var json = condition||{"filterbydomain":"dis","filterbyfirst":"","filterbyfclass":"","filterbysclass":"","filterbyfbody":"","filterbysbody":"","filterbynumber":"10"};
               // var results = [], cData = 0, cStyle = 0, crl = 0;
                console.log("getQueryOut get json:");
                console.log(json);
                json = {
                    "path": "/getQueryOut/",
                    "params": json
                };
                var resultData = $http({
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "http://59.110.52.133:3010/api/transfer",
                    // url:'http://59.110.52.133:9999/api/transfer',
                    data: JSON.stringify(json)
                }).then(function (response) {
                    console.log("get getQueryOut API:");
                    console.log(response);
                    if(response.data.return !== 0){
                        alert("API returned wrong data");
                    }
                    //console.log(results);
                    return response.data;
                });
                //console.log(resultData);
                return resultData;
            },
            getDiseaseIds:function(list) {
                //var json = {"DIDS":["d41311","d42983","d38428"]};
                var json = list||{"AND":["m12767","m12754"],"NOT":["l1087"]};
                // var results = [], cData = 0, cStyle = 0, crl = 0;
                console.log("getDisOut API gets json:");
                console.log(json);
                json = {
                    "path": "/getDisOut/",
                    "params": json
                };
                console.log(JSON.stringify(json));
                var resultData = $http({
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "http://59.110.52.133:3010/api/transfer",
                    data: JSON.stringify(json)
                }).then(function (response) {
                    console.log("get getDisOut API:");
                    console.log(response);
                    console.log(JSON.stringify(response.data));
                    //console.log(results);
                    return response.data;
                });
                //console.log(resultData);
                return resultData;
            },
            getMedicineIds:function(list) {
                //var json = {"DIDS":["d41311","d42983","d38428"]};
                var json = list||{"AND":["m12767","m12754"],"NOT":["l1087"]};
                // var results = [], cData = 0, cStyle = 0, crl = 0;
                console.log("getMedOut API gets json:");
                console.log(json);
                json = {
                    "path": "/getMedOut/",
                    "params": json
                };
                var resultData = $http({
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "http://59.110.52.133:3010/api/transfer",
                    data: JSON.stringify(json)
                }).then(function (response) {
                    console.log("get getMedOut API:");
                    console.log(response);
                    //console.log(results);
                    return response.data;
                });
                //console.log(resultData);
                return resultData;
            },
            getDisRelation:function(list) {
                //var json = {"DIDS":["d41311","d42983","d38428"]};
                var json = list||{"DIDS":["d41311","d42983","d38428"]};
                var defer = $q.defer();
                // var results = [], cData = 0, cStyle = 0, crl = 0;
                console.log("getDisRelation API gets json:");
                console.log(JSON.stringify(json));
                json = {
                    "path": "/getDisRelation/",
                    "params": json
                };
                var resultData = $http({
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "http://59.110.52.133:3010/api/transfer",
                    data: JSON.stringify(json)
                }).success(function (response) {
                    console.log("get getDisRelation API:");
                    console.log(response);
                    //console.log(results);
                    // return response.data;
                }).error(function (data,status,headers,config) {
                    console.log("can not get getDisRelation API!");
                    //console.log(data,status,headers,config);
                    // defer.reject(data);
                    // console.log(defer);
                    // console.log(defer.promise);
                    // return defer.promise.$$state;
                });
                //console.log(resultData);
                return resultData;
            },
            getMedRelation:function(list) {
                //var json = {"DIDS":["d41311","d42983","d38428"]};
                var json = list||{"MIDS":["m12767","m12754"]};
                // var results = [], cData = 0, cStyle = 0, crl = 0;
                console.log("getMedRelation API gets json:");
                console.log(json);
                json = {
                    "path": "/getMedRelation/",
                    "params": json
                };
                var resultData = $http({
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: "http://59.110.52.133:3010/api/transfer",
                    data: JSON.stringify(json)
                    // timeout:1
                }).success(function (response) {
                    console.log("get getMedRelation API:");
                    console.log(response);
                    //console.log(results);
                }).error(function (data) {
                    console.log("can not get getMedRelation API!");
                });
                //console.log(resultData);
                return resultData;
            }
        };
    });
