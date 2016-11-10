import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getip from './lib/ip.js';
//import {resolve} from 'path';
var colors = require('colors');
import paths from '../config/paths'
import { getEntry } from './lib/validEntry';
import getConfig from '../config/webpack.hot.config';

async function watch(config) {
  const entries = await getEntry(config.name)
  return {...{watch: true, entry: entries}, ...getConfig(config)}
}

const port = 8081;



async function server(config1) {

  let config = await watch(config1);

  const sourceDir = config.dirName;

  console.log(config.entry)

  for (var key in config.entry) {
    config.entry[key].unshift(
      require.resolve("webpack-dev-server/client") + `?http://0.0.0.0:${port}/`,
      require.resolve("webpack/hot/dev-server"));
  }

  //console.log(config.entry)

  let compiler = webpack(config);
  compiler.run(function (err, stats) {
    if (err) {
      return console.log(err);
    }

    console.log(stats.toString({
      colors  : true,
      children: false,

      // https://github.com/webpack/webpack/issues/1191#issuecomment-180922894

      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      //modules: false,
      //reasons: false,
      //source: false,
      //errors: false,
      //errorDetails: false,
      //warnings: false,
      //publicPath: false
    }));
  });
  var server = new WebpackDevServer(compiler, {
    contentBase   : paths.appDevBuild,
    clientLogLevel: 'none',
    quiet         : true,
    hot           : true,
    noInfo        : true,
    proxy         : {
      '/zzq/*'        : {
        target      : "http://h5.sit.ffan.com/",
        changeOrigin: true,
        secure      : false
      },
      '/newactivity/*': {
        target     : 'http://127.0.0.1:' + port + '/',
        pathRewrite: function (path, req) {
          path = path.replace('/newactivity/assets/', '/assets/');
          return path.replace('/newactivity/', '/html/');
        }
      }
    }
  }).listen(port, '0.0.0.0', function (err) {
    if (err) console.log(err);

    let myIp = getip();
    console.log("\n-------------\n");
    console.log(`http://${myIp}:${port}/newactivity/${sourceDir}.html`);
  });
}


export default server;
