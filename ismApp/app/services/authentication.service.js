(function () {
    "use strict";
    angular
        .module('app')
        .service('authentication', authentication);
    
    authentication.$inject = ['$window','$http',"$rootScope"];
    function authentication($window, $http,$rootScope) {
        var saveToken = function (token) {
            $window.localStorage['read-token'] = token;
        };
        var getToken = function () {
            return $window.localStorage['read-token'];
        };
        var register = function(user) {
            return $http.post('http://59.110.52.133:3010/api/register',user).success(function(data) {
                saveToken(data.token);
            });
        };

        var loginNode=function(user)
        {
            console.log("what the");
            console.log(user);
            //console.log($rootScope.Authenapikey);
            return $http.post('http://59.110.52.133:3010/api/login',user).success(function(data) {
                saveToken(data.token);
            });
        };

       /* var loginKong = function(user) {
            console.log($rootScope.Authenapikey);
             return $http.post('http://localhost:3000/api/transfer/?q={"path":"/login","params":""}',user).success(function(data) {
                saveToken(data.token);
            });
        };*/
        var logout = function() {
            $window.localStorage.removeItem('read-token');
        };

        var isLoggedIn = function() {
            var token = getToken();
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };
        var currentUser = function() {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email: payload.email,
                    name: payload.name,
                };
            }
        };
        

        return {
            saveToken: saveToken,
            getToken: getToken,
            register: register,
            //loginKong: loginKong,
            loginNode:loginNode,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser
        };
    }
})();


