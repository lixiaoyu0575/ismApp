"use strict";

angular.module('app')
	   .service("traMedical",function traMedical($q,$http,$rootScope){
	   
	    return{
            getAllList:function(){
                var defer=$q.defer();  //声明延后执行
                var json = {"Table": "Zhongyi","Id":"z0000000" };
                json = {
                    "path": "/medknowledge/zhongyiop",
                    "params": json
                };
                $http({method:'GET',
                	   url:'http://59.110.52.133:3010/api/transfer',
                	   params:{"q" : JSON.stringify(json)}
                	 }).
                success(function(data,status,headers,config){
                    defer.resolve(data);  //声明执行成功
                    console.log('traditional medical data success!!!');
                }).
                error(function(data,status,headers,config){
                    defer.reject();      //声明执行失败
                });
                                 
                return defer.promise; //返回承诺，返回获取数据的API
            },
            getZhongyilist:function(class1,class2,class3,class4,class5,pageSize,pageNumber){
                var defer=$q.defer();  //声明延后执行
                var start = pageNumber * pageSize;
                var end = (pageNumber +1) * pageSize;
                var json = {"Table": "Zhongyi","Id":"z0000000", "Sort_item":"Name"};
                json.Start = start;
                json.End = end;
                var filter = {"class1":class1,"class2":class2,"class3":class3,"class4":class4,"class5":class5};
                json.Filter = filter;
                json = {
                    "path": "/medknowledge/zhongyilist",
                    "params": json
                };
                $http({method:"GET",
                       url:"http://59.110.52.133:3010/api/transfer",
                       params:{"q" : JSON.stringify(json)}
                     }).
                success(function(data,status,headers,config){
                    defer.resolve(data);  //声明执行成功
                    console.log('traditional medical data success!!!');
                }).
                error(function(data,status,headers,config){
                    defer.reject();      //声明执行失败
                });
                                 
                return defer.promise; //返回承诺，返回获取数据的API
            },
            getDetails:function (Zid) {
                var defer=$q.defer();  //声明延后执行
                var json = {"Table": "Zhongyi","Id":Zid};
                json = {
                    "path": "/medknowledge/zhongyiop",
                    "params": json
                };
                $http({method:"GET",
                       url:"http://59.110.52.133:3010/api/transfer",
                       params:{"q" : JSON.stringify(json)}
                     }).
                success(function(data,status,headers,config){
                    console.log(data);
                    defer.resolve(data);  //声明执行成功
                    console.log('traditional medical detail success!!!');
                }).
                error(function(data,status,headers,config){
                    defer.reject();      //声明执行失败
                });
                return defer.promise; //返回承诺，返回获取数据的API
            }

        };

   });