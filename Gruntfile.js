(function(module) {
  'use strict';

  module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // command line arguments
    var config = {};
    var core = './src/styles/';
    var styleSCSS = core + 'style.scss';
    var styleCSS = core + 'style.css';
    var gruntInit = {
      sass: {
        dev: {
          options: {
            outputStyle: 'expanded'
          },
          files: {}
        }
      },
      watch: {
        css: {
          files: [core + '*.scss'],
          tasks: ['sass']
        }
      }
    };

    gruntInit.sass.dev.files[styleCSS] = styleSCSS;
    grunt.initConfig(gruntInit);
    grunt.registerTask('default', ['sass:dev', 'watch']);
    grunt.registerTask('css', ['sass:dev']);
  };
})(module);
