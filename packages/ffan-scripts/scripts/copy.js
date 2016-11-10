import Promise from 'bluebird';
import fs from './lib/fs';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy(dist) {
  const ncp = Promise.promisify(require('ncp'));
  try {
    await fs.makeDir('build');
    await fs.makeDir('build/html');
    await fs.makeDir('build/assets/js');
    await fs.makeDir('build/assets/css');
    await fs.makeDir('tmp/assets/js');
    await fs.makeDir('tmp/assets/css');


  }catch (e) {
    console.log(e);
  }

}

export default copy;
