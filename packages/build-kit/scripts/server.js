import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import getip from './lib/ip.js'
var colors = require('colors')
import paths from '../config/paths'
import { getEntry } from './lib/validEntry'
import getConfig from '../config/webpack.hot.config'

const port = 8081

async function getWatchConfig(config) {
  const entries = await getEntry(config.name)
  return {...{entry: entries}, ...getConfig(config)}
}

function getWebpack(config) {
  return webpack(config, function (err, stats) {
    if (err) {
      return console.log(err)
    }
    console.log(stats.toString({
      colors      : true,
      children    : false,
      // https://github.com/webpack/webpack/issues/1191#issuecomment-180922894
      hash        : false,
      version     : false,
      timings     : false,
      assets      : false,
      chunks      : false,
      modules     : false,
      reasons     : false,
      source      : false,
      errors      : false,
      errorDetails: false,
      warnings    : false,
      publicPath  : false
    }))

  })
}

async function server(options) {
  let config = await getWatchConfig(options)

  const sourceDir = config.dirName

  for (var key in config.entry) {
    config.entry[key].unshift(
      require.resolve("webpack-dev-server/client") + `?http://0.0.0.0:${port}/`,
      require.resolve("webpack/hot/dev-server"))
  }

  await webpack(getWebpack(config))

  var server = new WebpackDevServer(getWebpack(config), {
    contentBase   : paths.appDevBuild,
    clientLogLevel: 'none',
    quiet         : true,
    hot           : true,
    noInfo        : true,
    proxy         : {
      '/zzq/*'        : {
        target      : "http://www.baidu.com/", //special proxy domain example
        changeOrigin: true,
        secure      : false
      },
      // TODO : 暂时没啥用
      '/newactivity/*': {
        target     : 'http://127.0.0.1:' + port + '/',
        pathRewrite: function (path, req) {
          path = path.replace('/newactivity/assets/', '/assets/')
          return path.replace('/newactivity/', '/html/')
        }
      }
    }
  }).listen(port, '0.0.0.0', function (err) {
    if (err) console.log(err)

    let myIp = getip()
    console.log("\n-------------\n")
    console.log(`http://${myIp}:${port}/html/${sourceDir}.html`)
  })
}


export default server
