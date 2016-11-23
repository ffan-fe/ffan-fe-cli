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

export const isInFfanScripts = process.cwd().indexOf(path.join('ffan-fe-cli', 'packages', 'ffan-scripts')) !== -1

if (isInFfanScripts) {
  module.exports = {
    appSrc          : resolveApp('commons/boilerplate'),
    appNodeModules  : resolveApp('node_modules'),
    appCommons      : resolveApp('commons'),
    appHtmlTemplates: resolveApp('commons/htmlTemplates'),
    appDevBuild     : resolveApp('tmp'),
    appBuild        : resolveApp('build'),
    appRoot         : resolveApp(''),
    ownNodeModules  : resolveOwn('../node_modules'),
    resolve         : path.resolve,
    isInFfanScripts : isInFfanScripts,
  }
} else {
  module.exports = {
    appSrc          : resolveApp('src'),
    appNodeModules  : resolveApp('node_modules'),
    appCommons      : resolveApp('commons'),
    appHtmlTemplates: resolveApp('commons/htmlTemplates'),
    appDevBuild     : resolveApp('tmp'),
    appBuild        : resolveApp('build'),
    appRoot         : resolveApp(''),
    ownNodeModules  : resolveOwn('../node_modules'),
    resolve         : path.resolve,
    isInFfanScripts : isInFfanScripts,
  }
}

