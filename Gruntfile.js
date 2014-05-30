module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      compile: {
        files: {
          './static/css/main.css': './static/css/scss/main.scss',
          './static/css/base.css': './static/css/scss/base.scss'
        }
      },
      includePaths: {
        options: {
          includePaths: ['./static/lib/foundation/scss']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
};
