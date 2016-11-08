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

export default {
  appSrc        : resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveOwn('../node_modules'),
  appDevBuild   : resolveApp('tmp'),
  ownBabelrc: resolveOwn('../.babelrc'),
}
