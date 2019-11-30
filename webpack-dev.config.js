var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: path.join(__dirname, './app'),
  devtool: 'source-map',
  entry: {
    jsx: './index.js',
    html: './index.html',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      webworkify: 'webworkify-webpack'
    }
  },
  node: {
    console: true,
    fs: 'empty'
  },
  resolve: {
    modules: [
        path.join(__dirname, "src"),
        "node_modules"
      ]
  },
  module: {
    rules: [
      { test: /\.js$/, include: path.resolve(__dirname, 'node_modules/mapbox-gl/js/render/painter/use_program.js'), loader: 'transform/cacheable?brfs' },
      { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url-loader' },
      { test: /\.(ttf|eot|svg|)$/, loader: 'url-loader' },
      { test: /\.(html|ico|txt)$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader' },
      {
        include: /node_modules\/mapbox-gl/,
        enforce: "pre",
        loader: 'transform',
        query: 'brfs'
      }
  
    ],
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
  },
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}'
  },

  plugins: [

    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
      __DEV__: true
    })
  ]
}
