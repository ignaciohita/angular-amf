/*global require, console*/
var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

// Compress JS file
gulp.task("build", function () {
    "use strict";

    gulp.src("./amf.js")
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(uglify())
        .pipe(gulp.dest("/"));

    gulp.src("./angular.amf.js")
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(uglify())
        .pipe(gulp.dest("/"));
});
