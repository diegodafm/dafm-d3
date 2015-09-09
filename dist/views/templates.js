angular.module('dafm.tpls', []).run(['$templateCache', function($templateCache) {
    'use strict';
    $templateCache.put('scripts/modules/dafm.common/base.html',
        '<ui-view></ui-view><svg width=100% height=100%><rect x=10% y=10% width=50% height=50% fill="red"></svg>');
}]);
