'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    ngtemplates: {
      select: {
        options: {
          module: 'wt.select'
        },
        src: ['template/*.html'],
        dest: 'template/custom-select.js'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    concat: {
      dist: {
        src: [
          'src/*.js',
          'template/*.js'
        ],
        dest: 'dist/angular-extended-select.js'
      }
    },
    watch: {
      files: [
        'src/*.js',
        'template/*.html'
      ],
      tasks: ['ngtemplates', 'concat'],
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'demo/{,*/}*.html',
          'demo/{,*/}*.css',
          'demo/{,*/}*.js',
          'dist/*.css',
          'dist/*.js'
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/{,*/}*.js'
      ]
    },
    clean: {
      dist: {
        files: [{
          src: [
            'dist/*'
          ]
        }]
      },
      templates: {
        src: ['<%= ngtemplates.select.dest %>']
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 31729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.',
            'demo',
            'dist'
          ]
        }
      }
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'ngtemplates',
    'karma'
  ]);

  grunt.registerTask('demo', [
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('default', [
    'clean:dist',
    'jshint',
    'ngtemplates',
    'karma',
    'concat',
    'clean:templates'
  ]);
};
