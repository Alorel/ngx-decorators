import {expect} from 'chai';
import * as spawn from 'cross-spawn';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';
import * as rmrf from 'rimraf';

describe('Package', function() {
  this.timeout(120000);

  interface File {
    contents: string;
    path: string;
  }

  const cwd: string = path.dirname(require.resolve('../package.json'));

  spawn.sync('npm', ['run', 'build'], {
    cwd,
    env: Object.assign({}, process.env, {
      FROM_GENERAL_SUITE: '1'
    })
  });

  const paths: string[] = glob.sync('dist/**/*.{ts,js}', {cwd, absolute: true});
  const files: File[] = paths.map((p: string): File => {
    return {
      contents: fs.readFileSync(p, 'utf8'),
      path: path.relative(cwd, p)
    };
  });

  it('Should have files in dist', () => {
    expect(files).to.not.be.empty;
  });

  for (const f of files) {
    it(`${f.path} should not include "tslib"`, () => {
      expect(f.contents).to.not.contain('tslib', `${f.path} contains tslib`);
    });
  }

  after('cleanup', (cb: any) => {
    rmrf(path.join(cwd, 'dist'), cb);
  });
});
