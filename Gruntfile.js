'use strict';

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	var LIVERELOAD_PORT = 35792;

	grunt.initConfig({
		sass: {
			dev: {
				files: {
					'stylesheet.css': 'scss/stylesheet.scss'
				}
			}
		},
		watch: {
			scss: {
				files: ['scss/*.scss'],
				tasks: ['sass:dev'],
				options: {
					livereload: LIVERELOAD_PORT
				}
			},
			html: {
				files: ['index.html'],
				tasks: [],
				options: {
					livereload: LIVERELOAD_PORT
				}
			},
            js: {
                files: ['js/*.js'],
                tasks: [],
				options: {
					livereload: LIVERELOAD_PORT
				}
            }
		},
		connect: {
			options: {
				port: 9001,
				hostname: 'localhost',
				livereload: LIVERELOAD_PORT
			},
			server: {
				options: {
					open: true
				}
			}
		}
	});

	grunt.registerTask("serve", ["sass", "connect", "watch"]);
	grunt.registerTask("default", ["serve"]);
};
