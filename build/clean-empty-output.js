const Bluebird = require('bluebird');
global.Promise = Bluebird;
const glob = Bluebird.promisify(require('glob'));
const fs = require('fs-extra');

const globOpts = {
  absolute: true,
  cwd: require('path').join(__dirname, '..')
};

glob('dist/**/*.d.ts', globOpts)
  .filter(filePath => {
    return fs.readFile(filePath, 'utf8')
      .then(contents => {
        const trimmed = contents.trim();

        return trimmed === 'export {}' || trimmed === 'export {};';
      });
  })
  .map(fp => fs.unlink(fp))
  .catch(e => {
    console.error(e);

    process.exit(1);
  });
