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

export function getLoaders(px2remConfig, includePath, name) {
  return [
    {
      test   : /\.(vue)$/,
      include: includePath,
      loader : "vue",
      query  : {
        presets       : [require('./babel-presets-ffan')],
        cacheDirectory: true,
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
        name : `assets/img/${name}/${name}_[hash:8].[ext]`,
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
      loader: ExtractTextPlugin.extract("style", ["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss", "less"])
    },
    {
      test  : /\.css$/,
      loader: ExtractTextPlugin.extract("style", ["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss"])
    }
  ]

}

export function getModule(px2remConfig) {

  return {
    vue: {
      loaders: {
        css : ExtractTextPlugin.extract("vue-style", ["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss"]),
        less: ExtractTextPlugin.extract("vue-style", ["css", "px2remless?" + JSON.stringify(px2remConfig), "postcss", "less"])
      }
    },

    postcss: function () {
      return [autoprefixer];
    },
  }

}

export const vueConfig = {
  // FIX : Cannot find es2015
  loaders: {
    js: `babel?presets[]=${require.resolve('babel-preset-latest')}&plugins[]=${require.resolve('babel-plugin-transform-runtime')}&comments=false'`
  }
}
