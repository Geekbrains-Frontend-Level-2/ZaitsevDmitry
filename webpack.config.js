const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'main.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/, // scss
      //   use: ['babel-loader']
      // },
      {
        test: /\.css$/, // scss
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      } 
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
}


// var somevariable = '' // var
