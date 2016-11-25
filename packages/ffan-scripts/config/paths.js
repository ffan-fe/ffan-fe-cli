import path from 'path'
import fs from 'fs'

// 防止软连接失效
var appDirectory = fs.realpathSync(process.cwd())

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath)
}

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath)
}


/**
 * console.log(__dirname)
 * - pack: ffan-fe-cli/packages/ffan-scripts/config
 * - link: ffan-fe-cli/packages/ffan-scripts/config
 * - real: {real_dir}/node_modules/ffan-scripts/config
 *
 * console.log(process.cwd())
 * - pack: ffan-fe-cli/packages/ffan-scripts
 * - link: wit120-source
 * - real: wit120-source
 */

export const isInFfanScripts = process.cwd().indexOf(path.join('ffan-fe-cli', 'packages', 'ffan-scripts')) !== -1
export const isInRealLink = __dirname.indexOf(path.join('node_modules', 'ffan-scripts/')) !== -1

export default {
  appSrc          : isInFfanScripts ? resolveApp('commons/boilerplate') : resolveApp('src'),
  appNodeModules  : resolveApp('node_modules'),
  appCommons      : resolveApp('commons'),
  appHtmlTemplates: resolveApp('commons/htmlTemplates'),
  appDevBuild     : resolveApp('tmp'),
  appBuild        : resolveApp('build'),
  appRoot         : resolveApp(''),
  ownNodeModules  : resolveOwn('../node_modules'),
  resolve         : path.resolve,
  isInFfanScripts : isInFfanScripts,
  isInRealLink    : isInRealLink,
}


