const gulp = require('gulp');
const BuildTask = require('@joinbox/build-task');

const builder = new BuildTask();


// CSS
builder.setConfig('styles.paths.source', 'scss');


// JS
// Don't eslint as we're doing that in the browser and task takes local eslint rules (from 
// .eslintrc) and then doesn't find plugins.
builder.setConfig('scripts.technologies', ['react']);


// HTML
// index.html goes to the root folder
builder.setConfig('templates.paths.destination', '');
builder.setConfig('server.paths.source', '');
builder.setConfig('server.paths.start', '');


// Images
const imgSource = ['www/src/img/**/*'];
function imgFiles() {
    return gulp.src(imgSource)
        .pipe(gulp.dest('www/dist/img'));
}
function imgWatch() {
    return gulp.watch(imgSource, imgFiles);
}

builder.tasks.set('imgFiles', imgFiles);
builder.tasks.set('imgWatch', imgWatch);

builder.devTasks.push(imgFiles);
builder.watchTasks.push(imgWatch);




module.exports = builder.createTasks();
