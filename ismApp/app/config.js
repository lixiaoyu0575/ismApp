var app =
    angular.module('app')
        .config(
        [
            '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',"$httpProvider",
            function($controllerProvider, $compileProvider, $filterProvider, $provide) {
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
                app.constant = $provide.constant;
                app.value = $provide.value;
            }
        ]);



app.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        template: '<ul class="breadcrumb"><li><i class="fa fa-home"></i><a href="#">Home</a></li><li ng-repeat="step in steps" ng-class="{active: $last}" ' +
        'ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a>' +
        '<span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li></ul>'
    });
});

app.config(
        function ($httpProvider) {
    $httpProvider.interceptors.push('httpReject');
  /*  $httpProvider.interceptors.push(["$rootScope",function($rootScope){
             return {
                    request: function(config){
                        config.headers = config.headers || {};
                        if($rootScope.Authenapikey){
                            config.headers.apikey = $rootScope.Authenapikey;
                            config.headers.token=$rootScope.userToken;}
                        return config;
                        },
                    responseError: function(response){
                        }
                    };
            }]
        );*/
/*    $httpProvider.defaults.headers.common['apikey'] = AuthenticationKey;
    $httpProvider.defaults.headers.common['token'] = AuthenticationToken;*/
}).config(function ($anchorScrollProvider) {
    $anchorScrollProvider.disableAutoScrolling();
})
;

