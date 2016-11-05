import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import path from 'path';
import paths from './paths'


export default function getConfig({name, html = {}, px2rem = {}, framework = 'jquery'}) {

  // HTML
  const htmlConfig = Object.assign({}, html);
  htmlConfig.template = htmlConfig.template || `commons/tpl/${framework}Tpl.hbs`;

  // px2rem
  const px2remConfig = {
    remUnit     : 75,
    remPrecision: 8,
    ...px2rem
  };

  return {
    externals: {
      jquery     : 'jQuery',
      react      : 'React',
      'react-dom': 'ReactDOM',
      vue        : 'Vue',
    },

    output   : {
      path      : paths.appDevBuild,
      filename  : `assets/js/${name}_[name].js`,
      publicPath: '/newactivity/'
      // publicPath: 'http://127.0.0.1:8080/'
    },
    devtool  : "#cheap-module-source-map",
    resolveLoader: {
      root: paths.ownNodeModules,
      moduleTemplates: ['*-loader']
    },
    module   : {
      noParse: [
        'jquery',
        'react',
        'react-dom',
        'vue',
      ],
      loaders: [
        {
          test   : /\.(vue)$/,
          include: paths.appSrc,
          loaders: ["vue"],
          query  : {
            cacheDirectory: true
          }
        },
        {
          test   : /\.(js|jsx)$/,
          include: paths.appSrc,
          loader : "babel",
          query  : {
            cacheDirectory: true
          }
        },
        {
          test  : /\.(png|jpg|gif|jpeg)$/,
          loader: "url",
          query : {
            name : `assets/img/${name}_[hash:8].[ext]`,
            limit: 8192
          }
        },
        {
          test  : /\.(handlebars|hbs)$/,
          loader: "handlebars",
          query : {
            inlineRequires: '\/images\/'
          }
        },
        {
          test  : /\.(html)$/,
          loader: "html"
        },
        {
          test  : /\.(ttf|eot|svg)$/,
          loader: "url?limit=100000"
        },
        {
          test  : /\.less$/,
          loader: ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss", "less"])
        },
        {
          test  : /\.css$/,
          loader: ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss"])
        }
      ]
    },

    vue: {
      loaders: {
        css : ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss"]),
        less: ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss", "less"])
      }
    },

    postcss: function () {
      return [autoprefixer];
    },

    plugins: [
      new ExtractTextPlugin(`assets/css/${name}_[name].css`),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: `html/${name}.html`,
        ...htmlConfig,
      })
    ]
  }
};
