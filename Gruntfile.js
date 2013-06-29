/*
 * grunt-cli
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-init/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
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
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        node: true
      }
    },
    watch: {
      tests: {
        files: ['<%= nodeunit.tests %>', 'lib/**/*.js'],
        tasks: ['nodeunit', 'jshint:tests', 'jshint:source'],
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // "npm test" runs these tasks
  grunt.registerTask('test', ['jshint', 'nodeunit']);

  // Default task.
  grunt.registerTask('default', ['test']);

};
