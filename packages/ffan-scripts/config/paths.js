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

//if (__dirname.indexOf(path.join('packages', ''))) {
//
//}

export default {
  appSrc          : resolveApp('src'),
  appNodeModules  : resolveApp('node_modules'),
  appCommons      : resolveApp('commons'),
  appHtmlTemplates: resolveApp('commons/htmlTemplates'),
  appDevBuild     : resolveApp('tmp'),
  appBuild        : resolveApp('build'),
  appRoot         : resolveApp(''),
  ownNodeModules  : resolveOwn('../node_modules'),
  resolve         : path.resolve,
}
