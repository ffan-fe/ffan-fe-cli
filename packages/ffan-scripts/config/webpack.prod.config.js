import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'
import paths from './paths'
import * as config from './webpack.common.config'
import { getPack } from './package'

export default function getConfig({name, html = {}, px2rem = {}, framework = 'jquery', isCDN = 'no'}) {

  const pack = getPack()
  const localPublicPath = paths.resolve('/fe', pack['namespace'], pack['name'])

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
        modulesDirectories: [paths.ownNodeModules],
        moduleTemplates: ['*-loader', '*']
      },
    },
    output   : {
      path      : paths.appBuild,
      filename  : `assets/js/${name}/[name]_[hash:4].js`,
      publicPath: (isCDN === 'yes') ? 'https://nres.ffan.com/newactivity/' : localPublicPath,
    },
    resolve  : config.resolve,
    externals: config.externals,
    module   : {
      noParse: config.noParse,
      loaders: config.getLoaders(px2remConfig, paths.appSrc, name),
      ...config.getModule(px2remConfig)
    },
    vue      : config.vueConfig,
    plugins  : [
      new HtmlWebpackPlugin({
        filename: `html/${name}.html`,
        ...html,
        isCDN   : isCDN === 'yes',
        template: html.template || paths.resolve(paths.appHtmlTemplates, `${framework}Tpl.hbs`),
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
}
