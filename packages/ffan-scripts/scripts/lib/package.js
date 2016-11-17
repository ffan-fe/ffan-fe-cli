import fse from 'fs-extra'
import paths from '../../config/paths'


export function getPack(item) {
  try {
    const pack = fse.readJsonSync(paths.resolve(paths.appRoot, 'package.json'))
    return (typeof item === 'string') ? pack[item] : pack
  } catch (e) {
    throw new Error('-- Can not find remotes["origin"] in  package.json')
  }
}

export function getPackConf(item) {
  const pack = getPack()
  return pack[item]
}
