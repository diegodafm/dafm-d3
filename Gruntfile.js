module.exports = function ( grunt ) {

    'use strict';

    grunt.initConfig({
        jsbeautifier : {
            files : ['src/**/*.js','!src/vendor/**/*.js'],
            options : {
            }
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['Gruntfile.js','bower.js','src/**/*.js'],
                tasks: ['jsbeautifier', 'jshint', 'uglify', 'injector']
            },
            css: {
                files: ['src/styles/*.scss'],
                tasks: ['compass', 'clean:cache']
            },
            html: {
                files: ['index.html','debug.html', 'src/scripts/modules/**/*.html', 'src/views/**/*.html'],
                tasks: ['html2js', 'uglify']
            }
        },
        html2js: {
            options: {
                quoteChar: '\'',
                rename: function(moduleName) {
                    return moduleName.replace('../public/partials/', '');
                },
                module: 'dafm.tpls',
                indentString: '    ',
                singleModule: true,
                useStrict: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: [
                    'src/views/**/*.html',
                    'src/scripts/modules/**/*.html'
                ],
                dest: 'dist/views/templates.js'
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'src/styles/',
                    cssDir: 'dist/styles/'
                }
            }
        },
        clean: {
            cache: [
                //'.sass-cache'
            ]
        },
        jshint: {
            all: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    'Gruntfile.js',
                    'bower.js',
                    'src/scripts/**/*.js',
                    'test/**/*.js',
                    '!node_modules/**/*.js',
                    '!src/vendor/**/*.js',
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'config/karma.conf.js'
            },
            continuous: {
                configFile: 'config/karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/script/base.min.js': [
                        'src/vendor/jquery/dist/jquery.min.js',
                        'src/vendor/jquery/dist-ui/jquery-ui.min.js',
                        'src/vendor/angular/angular.min.js',
                        'src/vendor/angular-animate/angular-animate.js',
                        'src/vendor/angular-aria/angular-aria.js',
                        'src/vendor/angular-route/angular-route.min.js',
                        'src/vendor/angular-material/angular-material.js',
                        'src/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
                        'src/vendor/angular-ui-router/release/angular-ui-router.min.js',
                        'src/vendor/moment/moment.js',
                        'src/vendor/moment/locale/pt-br.js'
                    ],
                    'dist/script/app.min.js': [
                        'src/scripts/ngApp.js',
                        'src/scripts/ngRoute.js',
                        'src/scripts/ngConfig.js',
                        'src/scripts/ngModule.js',
                        'src/scripts/**/*js',
                        'dist/views/templates.js'
                    ]
                }
            }
        },
        injector: {
            options: {},
            app: {
                files: {
                    'debug.html' : [
                        'src/vendor/jquery/dist/jquery.min.js',
                        'src/vendor/jquery/dist-ui/jquery-ui.min.js',
                        'src/vendor/angular/angular.min.js',
                        'src/vendor/angular-animate/angular-animate.js',
                        'src/vendor/angular-aria/angular-aria.js',
                        'src/vendor/angular-material/angular-material.js',
                        'src/vendor/angular-route/angular-route.min.js',
                        'src/vendor/angular-ui-router/release/angular-ui-router.min.js',
                        'src/vendor/moment/moment.js',
                        'src/vendor/moment/locale/pt-br.js',
                        'src/scripts/ngApp.js',
                        'src/scripts/ngRoute.js',
                        'src/scripts/ngConfig.js',
                        'src/scripts/ngModule.js',
                        'src/scripts/**/*js',
                        'dist/views/templates.js',

                        /*--CSS--*/
                        'dist/styles/main.css',
                        ]
                }
            }
        }
    });

    // ===========================================================================
    // EVENTS ====================================================================
    // ===========================================================================
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(('EVENT ' + target + ':').green ,  (filepath + ' has ' + action).yellow);
    });


    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-html2js');

    // ===========================================================================
    // REGISTER TASKS ============================================================
    // ===========================================================================
    grunt.registerTask( 'build', [ 'jshint', 'uglify', 'compass', 'html2js','injector','clean:cache' ] );
    grunt.registerTask( 'default', [ 'build' ,'watch'] );
    grunt.registerTask( 'tdd', [ 'karma:unit'] );
    grunt.registerTask( 'test-continuous', [ 'karma:continuous'] );

};