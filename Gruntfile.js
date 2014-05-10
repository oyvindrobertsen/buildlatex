module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: {
                    './static/css/style.css': './static/css/less/style.less'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
};
