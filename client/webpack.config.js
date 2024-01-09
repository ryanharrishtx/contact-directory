const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      cards: './src/js/cards.js'
    },

    // TODO: Add the correct output
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    // TODO: Add the correct plugins
    plugins: [
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TODOs List'
      }),

      new GenerateSW(),
      new WebpackPwaManifest({
        "name": "Contact Directory App",
        "short_name": "Contact Directory",
        "description": "Keep track of your contacts",
        "background_color": "#01579b",
        "theme_color": "#ffffff",
        "start_url": "/",
        "orientation": "portrait",
        "display": "standalone",
        "icons": [
          {
            "src": path.resolve("src/images/logo.png"),
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      })
    ],

    // TODO: Add the correct modules
    module: {
      rules: [
          {
              test:/\.css$/i,
              use: ['style-loader','css-loader']
          },
          {
              test:/\.m?js$/,
              use: /(node_modules|bower_components)/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          },
          {
              test:/\.(png|svg|jpg|jpeg|gif)$/i,
              type:'asset/resource'
          }
      ]
    },
  };
};
