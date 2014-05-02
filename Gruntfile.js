module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: {
                    "style.css": "style.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
}
