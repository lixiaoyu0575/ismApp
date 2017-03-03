(function () {
    angular.module('app')
        .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$location', 'authentication',"$rootScope","$http"];
    function loginCtrl($location, authentication, $rootScope,$http) {
/*        $http.get("http://59.110.52.133:8001/consumers/admin/key-auth/")
         .success(function(response){
         console.log(response);
         console.log(response.data[0].key);
         $rootScope.Authenapikey=response.data[0].key;

         console.log($rootScope.Authenapikey);
         });*/


        var vm = this;
        console.log(vm.credentials);
        $rootScope.pageLoading = false;
        vm.credentials = {
            username: "",
           password: ""
        };

        vm.returnPage = $location.search().page || '/';
        vm.onSubmit = function () {
            console.log(vm.credentials);
            vm.formError = "";
            if (!vm.credentials.username || !vm.credentials.password) {
                vm.formError = "请输入邮箱和密码!好吗";
                console.log(vm.formError);
                return false;
            } else {
                //vm.doLogin();
                vm.getLogin();
            }
        };


        //var SideBarHide;

        vm.getLogin=function(){
            vm.formError = "";
            authentication.loginNode(vm.credentials).error(function (err) {
                vm.formError = err.message;
                console.log(err.message);
                console.log("log wrong");
               // console.log($rootScope.nodeToken);
            }).then(function (res) {
                console.log("log success");
                console.log(res.data);
                //console.log(AuthenticationToken);
                $rootScope.nodeToken = res.data.token;
                //$rootScope.userAuthority=res.data.auth;
                if(res.data.auth==="normal")
                {$rootScope.sidebarhidden=false;}
                else if(res.data.auth==="administrator")
                {$rootScope.sidebarhidden=true;}
                console.log($rootScope.sidebarhidden);
                //console.log($rootScope.userAuthority);
                console.log($rootScope.nodeToken);
                //console.log(vm.returnPage);
                $location.search('page', null);
                $location.path('/app/statistic');
                //$location.path(vm.returnPage);
            });
        };


    }

})();
