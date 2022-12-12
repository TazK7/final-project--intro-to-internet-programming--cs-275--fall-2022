const { src, dest, series, watch } = require(`gulp`),
    babel = require(`gulp-babel`),
    htmlValidator = require(`gulp-html`),
    CSSLinter = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    htmlCompressor = require(`gulp-htmlmin`),
    jsCompressor = require(`gulp-uglify`),
    cssCompressor = require(`gulp-clean-css`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `default`;

let validateHTML = () => {
    return src([
        `*.html`])
        .pipe(htmlValidator());
};

let lintCSS = () => {
    return src([`styles/main.css`])
        .pipe(CSSLinter({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};

let lintJS = () => {
    return src([`scripts/main.js`])
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`));
};

let compressHTML = () => {
    return src([`index.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let transpileJSForProd = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

let compressCSS = () => {
    return src(`styles/main.css`)
        .pipe(cssCompressor({compatibility: `ie8`}))
        .pipe(dest(`prod/styles`));
};

let transpileJSForDev = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `prod`,
                `.`
            ]
        }
    });
};

watch(`index.html`, validateHTML).on(`change`, reload);

watch(`main.js`, series(lintJS, transpileJSForDev))
    .on(`change`, reload);

watch(`main.css`, series(lintCSS, compressCSS))
    .on(`change`, reload);

exports.validateHTML = validateHTML;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.serve = series(
    validateHTML,
    lintCSS,
    lintJS,
    transpileJSForDev,
    serve
);
exports.build = series(
    compressHTML,
    compressCSS,
    transpileJSForProd
);
