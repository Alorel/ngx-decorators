const Bluebird = require('bluebird');
global.Promise = Bluebird;

const glob = Bluebird.promisify(require('glob'));
const globOpts = {
  absolute: true,
  cwd: require('path').join(__dirname, '..')
};

module.exports = {Bluebird, glob, globOpts};
