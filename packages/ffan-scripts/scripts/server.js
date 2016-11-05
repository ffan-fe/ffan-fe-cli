import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getip from './lib/ip.js';
var colors = require('colors');

const port = 8081;

async function server(sourceDir, config) {
  for(var key in config.entry){
    config.entry[key].unshift("webpack-dev-server/client?http://0.0.0.0:"+port+"/", "webpack/hot/dev-server");
  }

  let compiler = webpack({...config});

  var server = new WebpackDevServer(compiler, {
    contentBase: 'tmp',
    hot        : true,
    noInfo     : true,
    proxy      : {
      '/zzq/*'        : {
        target      : "http://h5.sit.ffan.com/",
        changeOrigin: true,
        secure      : false
      },
      '/newactivity/*': {
        target : 'http://127.0.0.1:'+port+'/',
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
