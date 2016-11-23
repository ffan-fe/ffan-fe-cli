import run from './run'
//import clean from './clean'
import copy from './copy'
import server from './server'
import { getPageConfig } from './lib/validEntry'
import paths from '../config/paths'

export default async function start(argv) {
  try {
    const pageName = argv['_'][1]

    if (!pageName) {
      console.error('-- pageName is empty! --')
      return
    }
    // clean

    const config = await getPageConfig(pageName)
    await run(copy, {target: paths.appDevBuild})
    await run(server, config)
  } catch (e) {
    console.log(e)
  }
}
