import selectPage from './selectPage'
import { execPromise,spawnPromise} from './lib/processPromise'
import resetBuild from './resetBuild'

// colors
// const chalk = require('chalk');

async function deploy() {

  try {
    console.log(`$ git status -s`.blue)
    const status = await spawnPromise('git status -s')
    console.log(status ? status.red : '---------------'.blue)
    //const selects = await selectPage()
    await resetBuild()
  } catch (e) {
    console.log('-- deploy error --')
    console.log(e)
  }

}

export default deploy
