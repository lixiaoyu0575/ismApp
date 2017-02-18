/**
 * Created by think on 2017/1/18.
 */
(function () {
    "use strict";
    angular
        .module('app')
        .service('getUsers', getUsers);

    getUsers.$inject = ['$window','$http',"$rootScope"];
    function getUsers($window, $http,$rootScope) {


        var getMyUser = function(){
            return $http.get("http://59.110.52.133:3010/api/getuser").success(function(data){
                console.log(data);
            });
        };

        var postMyUser=function(user){
            return $http.post("http://59.110.52.133:3010/api/postuser",user).success(function(){
                console.log("Post Success");
            });
        };

        var deleteUser=function(user){
            return $http.post("http://59.110.52.133:3010/api/deleteuser",user).success(function(){
                console.log("Delete Success");
            });
        };

        return {
            getMyUser: getMyUser,
            postMyUser:postMyUser,
            deleteUser:deleteUser
        };
    }
})();