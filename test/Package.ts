import * as Bluebird from 'bluebird';
import {expect} from 'chai';
import * as spawn from 'cross-spawn';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import {Test} from 'mocha';
import * as path from 'path';
import * as rmrf from 'rimraf';

describe('Package', function() {
  interface File {
    contents: string;
    path: string;
  }

  let cwd: string;
  let paths: string[];
  let files: File[];

  before('Init cwd', () => {
    cwd = path.dirname(require.resolve('../package.json'));
  });

  before('Build', function(cb: any) {
    this.timeout(120000);
    const proc = spawn('npm', ['run', 'build'], {
      cwd,
      env: Object.assign({}, process.env, {
        FROM_GENERAL_SUITE: '1'
      })
    });
    let errored = false;
    proc.once('error', (e: any) => {
        errored = true;
        cb(e);
      })
      .once('exit', (code: number) => {
        if (errored) {
          return;
        }
        if (code === 0) {
          cb();
        } else {
          cb(new Error(`Code ${code}`));
        }
      });
  });

  before('get paths', (cb: any) => {
    glob('dist/**/*.{ts,js}', {cwd, absolute: true}, (e: any, p: string[]) => {
      if (e) {
        cb(e);
      } else {
        paths = p;
        cb();
      }
    });
  });

  before('Get files', () => {
    return Bluebird
      .map(paths, (p: string): Promise<File> => {
        return fs.readFile(p, 'utf8')
          .then((contents: string): File => {
            return {
              contents,
              path: path.relative(cwd, p)
            };
          });
      })
      .then((f: File[]) => {
        files = f;
      });
  });

  before('Create test cases', () => {
    this.addTest(new Test('Should have files in dist', () => {
      expect(files).to.not.be.empty;
    }));
    for (const f of files) {
      this.addTest(new Test(`${f.path} should not include "tslib"`, () => {
        expect(f.contents).to.not.contain('tslib', `${f.path} contains tslib`);
      }));
    }
  });

  it('', () => {
    //noop
  });

  after('cleanup', (cb: any) => {
    rmrf(path.join(cwd, 'dist'), cb);
  });
});
