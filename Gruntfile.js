module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/jquery-textrange.js'],
            options: {
                eqeqeq: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                undef: true,
                unused: true,
                eqnull: true,
                node: true,
                browser: true,
                jquery: true
            }
        },
        uglify: {
            all: {
                files: {
                    "src/jquery-textrange.min.js": [ "src/jquery-textrange.js" ]
                },
                options: {
                    preserveComments: false,
                    beautify: {
                        ascii_only: true
                    },
                    banner: "/*! jQuery TextRange v<%= pkg.version %> | " +
                            "(c) 2012, 2013 Daniel Imhoff <dwieeb@gmail.com> | " +
                            "MIT/X11 License */\n",
                    compress: {
                        hoist_funs: false,
                        loops: false,
                        unused: false
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'uglify']);
};
