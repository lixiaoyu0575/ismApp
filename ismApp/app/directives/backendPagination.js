/**
 * Created by Wemakefocus on 2016/11/29.
 */
(function () {
    "use strict";

    angular
        .module('app')
        .directive('backendPagination', directiveName);

    directiveName.$inject = ['dependency'];

    /* @ngInject */
    function directiveName(dependency) {
        var directive = {
            bindToController: true,
            controller: ControllerName,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    ControllerName.$inject = ['dependency'];

    /* @ngInject */
    function ControllerName(dependency) {

    }

})();

