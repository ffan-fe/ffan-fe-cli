import webpack from 'webpack';
import { getEntry } from './lib/validEntry';
import getConfig from '../config/webpack.hot.config';

async function watch(config) {
  //return new Promise((resolve, reject) => {
  //console.log(config);
  const entries = await getEntry(config.name);
  const webpackConfig = {...{watch: true, entry: entries}, ...getConfig(config)};

  return new Promise((resolve, reject) => {

    webpack(webpackConfig, (err, stats) => {
      if (err) {
        console.log(err);
        return reject(err)
      }

      console.log(stats.toString({
        colors  : true,
        children: false
      }));

      return resolve(webpackConfig)

    })

  })


//return new Promise((resolve, reject) =>
//
//  validModule(config).then(entry => {
//
//    const webpackConfig ={...{watch: true, entry: entry}, ...webpackConfig(config)};
//
//    webpack(webpackConfig, (err, stats) => {
//      if (err) {
//        console.log(err);
//        reject(err);
//      }
//
//      console.log(stats.toString({
//        colors  : true,
//        children: false
//      }));
//
//      return resolve(webpackConfig);
//    });
//  }, err => {
//    console.log(err);
//    reject(err);
//  });
//});

}

export default watch;
