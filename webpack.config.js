var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: path.join(__dirname, './app'),
  entry: {
    jsx: './index.js',
    html: './index.html'
  },
  output: {
      path: path.join(__dirname, './dist'),
      filename: 'bundle.js'
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
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
  rules: [
      { test: /\.js$/, include: path.resolve(__dirname, 'node_modules/mapbox-gl/js/render/painter/use_program.js'), loader: 'transform/cacheable?brfs' },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url-loader' },
      { test: /\.(ttf|eot|svg|)$/, loader: 'url-loader' },
      { test: /\.(html|ico|txt)$/, loader: 'file?name=[name].[ext]' },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader' }
    ]
  },
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}'
  },
  postLoaders: [
    {
      include: /node_modules\/mapbox-gl/,
      loader: 'transform',
      query: 'brfs'
    }
  ],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }, comments: false}),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production') },
      __DEV__: false
    }),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
}
