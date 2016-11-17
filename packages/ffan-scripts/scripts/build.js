import webpack from 'webpack'
import run from './run';
import clean from './clean'
import paths from '../config/paths'
import getConfig from '../config/webpack.prod.config'
import { getEntry, getPageConfig } from './lib/validEntry'
import uploadCDN from './uploadCDN'

async function bundle(config) {
  const entries = await getEntry(config.name)
  return new Promise((resolve, reject)=> {
    webpack({...{entry: entries}, ...getConfig(config)}, (err, stats) => {

      if (err) {
        reject(err)
      }

      console.log(stats.toString({
        colors  : true,
        children: false,

        // https://github.com/webpack/webpack/issues/1191#issuecomment-180922894

        hash   : false,
        version: false,
        timings: false,
        assets : false,
        chunks : false,
      }))

      resolve(entries)

    })

  })

}


export default async function build(selects) {

  return await Promise.all(selects.pages.map(async page => {
    const pageConfig = await getPageConfig(page)
    await run(bundle, ({...pageConfig, ...{isCDN: selects.isCDN}}))
    if (selects.isCDN === 'yes') {
      await uploadCDN(page)
    }
  }))


}
