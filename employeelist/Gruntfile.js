module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            dist: {
                src: [
                    'src/app.module.js',
                    'src/**/*.module.js',
                    'src/**/*.component.js',
                    'src/**/*.filter.js',
                    'src/**/*.controller.js',
                    'src/**/*.service.js',
                    'src/template.js'
                ],
                dest: "dist/js/default.js"
            }
        },
        uglify: {
            options: {},
            dist: {
                files: {
                    'dist/js/default.min.js': 'dist/js/default.js'
                }
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            compress: {
                files: {
                    'dist/css/default.css': [
                        "src/employee-list/employee-list.css",
                        "src/alert/alert.css",
                        "src/index.css"
                    ]
                }
            }
        }
    });

    // Marge and compress js files
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Merge CSS files into one
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Register the task
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
}