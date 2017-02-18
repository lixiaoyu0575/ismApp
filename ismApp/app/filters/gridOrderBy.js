/**
 * Created by Wemakefocus on 2016/4/28.
 */
"use strict";

angular.module('app').filter('gridOrderBy', function() {
    return function(items, field, reverse) {
        var filtered = [];
        console.log(arguments);
        angular.forEach(items, function(item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
             console.log(a);
            if (b === "") {
                return 1;
            }else if (a === "") {
                return -1;
            }
            console.log(b);
            console.log(b[field]);
            if (typeof a[field] === "string" && b[field] === "string") {
                console.log(typeof a[field]);
                return b[field].localeCompare(a[field]);
            }
            return b[field] - a[field];
        });
        if(reverse) {
            filtered.reverse();
        }
        return filtered;
    };
});