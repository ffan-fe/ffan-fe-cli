import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'

export const externals = {
  jquery     : 'jQuery',
  react      : 'React',
  'react-dom': 'ReactDOM',
  vue        : 'Vue',
}

export const noParse = [
  'jquery',
  'react',
  'react-dom',
  'vue',
]

export function getLoaders(px2remConfig, includePath) {
  return [
    {
      test   : /\.(vue)$/,
      include: includePath,
      loaders: ["vue"],
      query  : {
        presets       : [require('./babel-presets-ffan')],
        cacheDirectory: true
      }
    },
    {
      test   : /\.(js|jsx)$/,
      include: includePath,
      loader : "babel",
      query  : {
        presets       : [require('./babel-presets-ffan')],
        cacheDirectory: true,
      }
    },
    {
      test  : /\.(png|jpg|gif|jpeg)$/,
      loader: "url",
      query : {
        name : `assets/img/[name]/[hash:8].[ext]`,
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

}

export function getModule(px2remConfig) {

  return {
    vue: {
      loaders: {
        css : ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss"]),
        less: ExtractTextPlugin.extract(["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss", "less"])
      }
    },

    postcss: function () {
      return [autoprefixer];
    },
  }

}
