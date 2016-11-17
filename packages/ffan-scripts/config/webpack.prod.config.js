import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'
import paths from './paths'
import * as config from './webpack.common.config'

export default function getConfig({name, html = {}, px2rem = {}, framework = 'jquery', isCDN = 'no'}) {

  // px2rem
  const px2remConfig = {
    remUnit     : 75,
    remPrecision: 8,
    ...px2rem
  }

  return {
    ...{
      dirName      : name,
      devtool      : "#cheap-module-source-map",
      resolveLoader: {
        root           : paths.ownNodeModules,
        moduleTemplates: ['*-loader']
      },
    },
    output   : {
      path      : paths.appBuild,
      filename  : `assets/js/${name}/[name]_[hash:4].js`,
      publicPath: (isCDN === 'yes') ? 'https://nres.ffan.com/newactivity/' : '/newactivity/',
    },
    externals: config.externals,
    module   : {
      noParse: config.noParse,
      loaders: config.getLoaders(px2remConfig, paths.appSrc),
      ...config.getModule(px2remConfig)
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: `html/${name}/${name}.html`,
        ...html,
        isCDN   : isCDN === 'yes',
        template: html.template || `commons/tpl/${framework}Tpl.hbs`,
      }),
      new ExtractTextPlugin(`assets/css/${name}/[name]_[hash:4].css`),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
          warnings : false,
        },
      }),
    ]
  }

  //const publicPath = (isCDN === 'yes') ? 'https://nres.ffan.com/newactivity/' : '/newactivity/';
  //
  //// HTML
  //const defaultHtmlConfig = customs[name] || {};
  //const htmlConfig = {...defaultHtmlConfig, ...html, ...{isCDN: isCDN === 'yes'}};
  //htmlConfig.template = htmlConfig.template || `src/_commons/tpl/${framework}Tpl.hbs`;
  //
  //// px2rem
  //const px2remConfig = {
  //  remUnit     : 75,
  //  remPrecision: 8,
  //  ...px2rem
  //};
//  return {
//    externals: {
//      jquery     : 'jQuery',
//      react      : 'React',
//      'react-dom': 'ReactDOM',
//      vue        : 'Vue',
//    },
//    output   : {
//      path      : "./build",
//      filename  : `assets/js/${name}_[name]_[hash:4].js`,
//      publicPath: publicPath,
//    },
//    devtool  : "#source-map",
//    module   : {
//      noParse: [
//        'jquery',
//        'react',
//        'react-dom',
//        'vue',
//      ],
//      loaders: [
//        {
//          test   : /\.(vue)$/,
//          exclude: /(node_modules|bower_components)/,
//          loaders: ["vue-loader"],
//        },
//        {
//          test   : /\.(js|jsx)$/,
//          exclude: /(node_modules|bower_components)/,
//          loader : "babel-loader",
//        },
//        {
//          test  : /\.(png|jpg|gif|jpeg)$/,
//          loader: "url-loader",
//          query : {
//            name : `assets/img/${name}_[hash:8].[ext]`,
//            limit: 8192
//          }
//        },
//        {
//          test  : /\.(handlebars|hbs)$/,
//          loader: ["handlebars-loader"],
//          query : {
//            inlineRequires: '\/images\/'
//          }
//        },
//        {
//          test  : /\.(html)$/,
//          loader: "html-loader"
//        },
//        {
//          test  : /\.(ttf|eot|svg)$/,
//          loader: "url-loader?limit=100000"
//        },
//        {
//          test  : /\.less$/,
//          loader: ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss-loader", "less"])
//        },
//        {
//          test  : /\.css$/,
//          loader: ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss-loader"])
//        }
//      ]
//    },
//
//    vue: {
//      loaders: {
//        css : ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss-loader"]),
//        less: ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss-loader", "less"])
//      }
//    },
//
//    postcss: function () {
//      return [autoprefixer];
//    },
//
//    plugins: [
//      new HtmlWebpackPlugin({
//        filename: `html/${name}.html`,
//        ...htmlConfig,
//      }),
//      new ExtractTextPlugin(`assets/css/${name}_[name]_[hash:4].css`),
//      new webpack.optimize.OccurenceOrderPlugin(true),
//      new webpack.optimize.UglifyJsPlugin({
//        compress: {
//          screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
//          warnings : false,
//        },
//      }),
//    ]
//  }


};
