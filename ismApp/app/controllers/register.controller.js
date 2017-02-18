(function() {
    "use strict";
    angular.module('app')
        .controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$location','authentication', "$rootScope"];
    function registerCtrl($location, authentication, $rootScope) {
        $rootScope.pageLoading = false;
        var vm = this;
        vm.credentials = {
            name: "",
            email: '',
            password: ''
        };

        vm.returnPage = $location.search().page || '/';
        vm.onSubmit = function() {
            console.log(vm.credentials);
            vm.formError = "";
            if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
                vm.formError = "需要填完所有字段!";
                return false;
            } else {
                vm.doRegister();
            }
        };
        vm.doRegister = function() {
            vm.formError = "";
            authentication.register(vm.credentials).error(function(err) {
                vm.formError = err;
            }).then(function() {
                $location.search('page', null);
                $location.path(vm.returnPage);
            });
        };
    }

})();
