/**
 * Created by Diego Alisson on 12/14/14.
 */
(function() {
    angular.module('dafm')
        .config(function config($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('app', {
                    url: '/',
                    views: {
                        '': {
                            templateProvider: function($templateCache) {
                                return $templateCache.get('scripts/modules/dafm.common/base.html');
                            },
                            controller: 'BaseController',
                            controllerAs: 'baseCtrl'
                        }
                    }
                })
                .state('app1', {
                    url: '/1',
                    views: {
                        '': {
                            templateProvider: function($templateCache) {
                                return $templateCache.get('scripts/modules/dafm.common/base.html');
                            },
                            controller: 'BaseController',
                            controllerAs: 'baseCtrl'
                        }
                    }
                });
        }).run(function($rootScope, $location, $templateCache, $state) {
            if ($state) {

            }
        });
}());
