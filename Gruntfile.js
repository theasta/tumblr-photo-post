'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    nodeunit: {
      tests: [ 'test/*_test.js' ]
    },
    jshint: {
      tests: [
        '<%= nodeunit.tests %>'
      ],
      gruntfile: [
        'Gruntfile.js'
      ],
      source: [
        'lib/**/*.js',
        'bin/*',
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    watch: {
      tests: {
        files: ['<%= nodeunit.tests %>', 'lib/**/*.js'],
        tasks: ['nodeunit', 'jshint:tests', 'jshint:source'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'nodeunit']);
  grunt.registerTask('default', ['test']);

};
