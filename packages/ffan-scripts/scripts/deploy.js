import selectPage from './selectPage'
import { execPromise,spawnPromise} from './lib/processPromise'
import resetBuild from './resetBuild'
import paths from '../config/paths'
import clean from './clean'
import build from './build'
import commit from './commit'
import run from './run'

// colors
// const chalk = require('chalk');

async function deploy() {

  try {
    console.log(`$ git status -s`.blue)
    const status = await spawnPromise('git status -s')
    console.log(status ? status.red : '---------------'.blue)
    const selects = await selectPage()
    let repo = await run(resetBuild)
    await run(clean, {
      rootPath: paths.appBuild,
      sourceDirs: selects.pages,
    });
    // TODO: copy library

    await run(build, selects)
    await run(commit, {repo, pages: selects.pages})
    await repo.push(remote.name, branch);

  } catch (e) {
    console.log('-- deploy error --')
    console.log(e)
  }

}

export default deploy
