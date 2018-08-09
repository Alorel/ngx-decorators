const {glob, globOpts, Bluebird} = require('./common');
const fs = require('fs-extra');
const htmlmin = require('htmlmin');
const cssmin = require('cssmin');

const html$ = glob('docs/**/*.html', globOpts)
  .map(fpath => {
    return fs.readFile(fpath, 'utf8')
      .then(c => fs.writeFile(fpath, htmlmin(c)))
  });

const css$ = glob('docs/**/*.css', globOpts)
  .map(fpath => {
    return fs.readFile(fpath, 'utf8')
      .then(c => fs.writeFile(fpath, cssmin(c)));
  });

Bluebird.all([html$, css$])
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
