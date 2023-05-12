const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();

// Clean assets

function clear() {
    return src('./dist/assets/*', {
            read: false
        })
        .pipe(clean());
}

// JS function 

function js() {
    const source = './src/js/*.js';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('./dist/assets/js/'))
        .pipe(browsersync.stream());
}

// CSS function 

function css() {
    const source = './src/scss/style.scss';

    return src(source)
        .pipe(changed(source))
        .pipe(sass({
            includePaths: ['node_modules']
          }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(cssnano())
        .pipe(dest('./dist/assets/css/'))
        .pipe(browsersync.stream());
}

// Optimize images

function img() {
    return src('./src/img/*')
        .pipe(imagemin())
        .pipe(dest('./dist/assets/img'));
}

function font() {
    return src('./src/fonts/**/*.*')
        .pipe(dest('./dist/assets/fonts'));
}

function html() {
    return src('*.html')
        .pipe(dest('./dist'));
}

// Watch files

function watchFiles() {
    watch('./src/scss/*', css);
    watch('./src/js/*', js);
    watch('./src/img/*', img);
    watch('./src/fonts/**/*.*', font);
    watch('*.html', html);
}

// BrowserSync

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });
}

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(js, css, img, font, html));