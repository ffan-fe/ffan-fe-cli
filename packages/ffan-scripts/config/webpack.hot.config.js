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
  };

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
      path      : paths.appDevBuild,
      filename  : `assets/js/${name}/[name].js`,
      publicPath: (isCDN === 'yes') ? 'https://nres.ffan.com/newactivity/' : '/newactivity/',
    },
    externals: config.externals,
    module   : {
      noParse: config.noParse,
      loaders: config.getLoaders(px2remConfig, paths.appSrc),
      ...config.getModule(px2remConfig)
    },
    plugins  : [
      new HtmlWebpackPlugin({
        filename: `html/${name}.html`,
        ...html,
        isCDN   : isCDN === 'yes',
        template: html.template || `commons/tpl/${framework}Tpl.hbs`,
      }),
      new ExtractTextPlugin(`assets/css/${name}/[name].css`),
      new webpack.HotModuleReplacementPlugin(),
    ]
  }


  //return {
  //  dirName      : name,
  //  externals    : {
  //    jquery     : 'jQuery',
  //    react      : 'React',
  //    'react-dom': 'ReactDOM',
  //    vue        : 'Vue',
  //  },
  //  output       : {
  //    path      : paths.appDevBuild,
  //    //path: "adsaf",
  //    filename  : `assets/js/${name}/[name].js`,
  //    publicPath: '/newactivity/'
  //  },
  //  devtool      : "#cheap-module-source-map",
  //  resolveLoader: {
  //    root           : paths.ownNodeModules,
  //    moduleTemplates: ['*-loader']
  //  },
  //  module       : {
  //    noParse: [
  //      'jquery',
  //      'react',
  //      'react-dom',
  //      'vue',
  //    ],
  //    loaders: [
  //      {
  //        test   : /\.(vue)$/,
  //        include: paths.appSrc,
  //        loaders: ["vue"],
  //        query  : {
  //          presets       : [require('./babel-presets-ffan')],
  //          cacheDirectory: true
  //        }
  //      },
  //      {
  //        test   : /\.(js|jsx)$/,
  //        include: paths.appSrc,
  //        loader : "babel",
  //        query  : {
  //          presets       : [require('./babel-presets-ffan')],
  //          cacheDirectory: true,
  //        }
  //      },
  //      {
  //        test  : /\.(png|jpg|gif|jpeg)$/,
  //        loader: "url",
  //        query : {
  //          name : `assets/img/${name}_[hash:8].[ext]`,
  //          limit: 8192
  //        }
  //      },
  //      {
  //        test  : /\.(handlebars|hbs)$/,
  //        loader: "handlebars",
  //        query : {
  //          inlineRequires: '\/images\/'
  //        }
  //      },
  //      {
  //        test  : /\.(html)$/,
  //        loader: "html"
  //      },
  //      {
  //        test  : /\.(ttf|eot|svg)$/,
  //        loader: "url?limit=100000"
  //      },
  //      {
  //        test  : /\.less$/,
  //        loader: ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss", "less"])
  //      },
  //      {
  //        test  : /\.css$/,
  //        loader: ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss"])
  //      }
  //    ]
  //  },
  //
  //  vue: {
  //    loaders: {
  //      css : ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss"]),
  //      less: ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss", "less"])
  //    }
  //  },
  //
  //  postcss: function () {
  //    return [autoprefixer];
  //  },
  //
  //  plugins: [
  //    new ExtractTextPlugin(`assets/css/${name}/[name].css`),
  //    new webpack.HotModuleReplacementPlugin(),
  //    new HtmlWebpackPlugin({
  //      filename: `html/${name}.html`,
  //      ...htmlConfig,
  //    })
  //  ]
  //}


};
