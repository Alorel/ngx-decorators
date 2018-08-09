const {glob, globOpts} = require('./common');
const fs = require('fs-extra');

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
