var path = require('path')
var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './src/dist'),
    publicPath: './src/dist/', 
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      
      {
        test: /\.vue$/,
        exclude: /bower_components/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        include: [ // use `include` vs `exclude` to white-list vs black-list
                    path.resolve(__dirname, "src"), // white-list your app source files
                    require.resolve("bootstrap-vue"), // white-list bootstrap-vue
                ],
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
         test:/\.scss$/,
         use:[
         'style-loader',
         'css-loader',
         'sass-loader'
         ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },

  plugins: [
        new LiveReloadPlugin(
        {
          appendScriptTag: true
        }),
        new BrowserSyncPlugin(
        {
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080/pasarcoder/'
        },
        {
            reload: false
        })
    ],

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    contentBase: false,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
