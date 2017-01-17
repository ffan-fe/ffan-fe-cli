import run from './run'
//import clean from './clean'
import copy from './copy'
import server from './server'
import { getPageConfig } from './lib/validEntry'
import paths from '../config/paths'
import selectPage from './selectPage'
import fse from 'fs-extra'

export default async function start(argv) {
  try {
    if (argv === undefined) {
      return console.log('-- error scripts --')
    }

    const pageName = argv['_'][1]

    if (!pageName) {
      return console.error('-- pageName is empty! --')
    }

    const pageDir = paths.resolve(paths.appSrc, pageName)
    if (!fse.existsSync(pageDir)) {
      return console.log(`-- ${pageDir} is not exist! --`.cyan)
    }

    const config = await getPageConfig(pageName)
    await run(copy, {target: paths.appDevBuild})
    await run(server, config)
  } catch (e) {
    console.log(e)
  }
}
