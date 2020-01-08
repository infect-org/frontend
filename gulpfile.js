const gulp = require('gulp');
const rev = require('gulp-rev');
const revCollect = require('gulp-rev-collector');
const revDelete = require('rev-del');
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
builder.prodTasks.push(imgFiles);


// Root folder files (favicon etc.)
const rootFiles = ['www/src/root/**/*'];
function copyRootFiles() {
    return gulp.src(rootFiles)
        .pipe(gulp.dest('www/dist/'));
}
function watchRootFiles() {
    return gulp.watch(rootFiles, copyRootFiles);
}

builder.tasks.set('rootFiles', copyRootFiles);
builder.tasks.set('rootWatch', watchRootFiles);

builder.devTasks.push(copyRootFiles);
builder.watchTasks.push(watchRootFiles);
builder.prodTasks.push(copyRootFiles);

// Tenant specific files (overlay text etc.)
const tenantFilesPath = ['www/src/tenant/**/*'];
function copyTenantFiles() {
    return gulp.src(tenantFilesPath)
        .pipe(gulp.dest('www/dist/tenant'));
}
function watchTenantFiles() {
    return gulp.watch(tenantFilesPath, copyTenantFiles);
}

builder.tasks.set('tenantFiles', copyTenantFiles);
builder.tasks.set('tenantWatch', watchTenantFiles);

builder.devTasks.push(copyTenantFiles);
builder.watchTasks.push(watchTenantFiles);
builder.prodTasks.push(copyTenantFiles);


// Cache
function bustRename() {
    const distFolder = 'www/dist';
    return gulp.src([`${distFolder}/**/*.js`, `${distFolder}/**/*.css`])
        .pipe(rev())
        .pipe(gulp.dest(distFolder))
        .pipe(rev.manifest())
        .pipe(revDelete({ dest: distFolder }))
        .pipe(revDelete())
        .pipe(gulp.dest(distFolder));
} 
function bustHtml() {
    const distFolder = 'www/dist';
    return gulp.src([`${distFolder}/rev-manifest.json`, `${distFolder}/**/*.{html,css,js}`])
        .pipe(revCollect())
        .pipe(gulp.dest(distFolder));
}

builder.tasks.set('bustRename', bustRename);
builder.tasks.set('bustHtml', bustHtml);

// Now export all tasks
const tasks = builder.createTasks();

// Create a new main build task as all build tasks in BuildTask are executed in parallel (and
// we need to wait for all tasks to complete before we can bust).
tasks.infectProd = gulp.series(builder.tasks.get('prod'), bustRename, bustHtml);

module.exports = tasks;

