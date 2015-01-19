'use strict';

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-manifest');

	var LIVERELOAD_PORT = 35792;

	grunt.initConfig({
		sass: {
			dev: {
				files: {
					'stylesheet.css': 'scss/stylesheet.scss'
				}
			}
		},
		manifest: {
			generate: {
				options: {
					basePath: '/',
					cache: [
						// 'js/', or wildcard ?
						'manifest.appcache',
						'stylesheet.css',
						'manifest.json',
						'img/favicon.ico',

						'js/Controllers/GameController.js',
						'js/Models/Playground.js',
						'js/Models/Rules.js',
						'js/Models/Score.js',
						'js/Models/Snake.js',
						'js/Views/PlaygroundView.js',
						'js/main.js',
						'js/require.js'
					],
					network: ['http://*', 'https://*'],
					fallback: ['/ /index.html'],
					// exclude: ['js/jquery.min.js'],
					preferOnline: true,
					verbose: true,
					timestamp: true,
					hash: true,
					master: ['index.html']
				},
				src: [
					'index.html',
					'js/',
					'img/',
					'stylesheet.css',
					'manifest.json'
				],
				dest: 'manifest.appcache'
			}
		},
		watch: {
			scss: {
				files: ['scss/*.scss'],
				tasks: ['sass:dev', 'manifest:generate'],
				options: {
					livereload: LIVERELOAD_PORT
				}
			},
			html: {
				files: ['index.html'],
				tasks: ['manifest:generate'],
				options: {
					livereload: LIVERELOAD_PORT
				}
			},
            js: {
                files: ['js/**/*.js'],
                tasks: ['manifest:generate'],
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

	grunt.registerTask("serve", ["manifest", "sass", "connect", "watch"]);
	grunt.registerTask("default", ["serve"]);
	grunt.registerTask("generate", ["manifest"]);
};
