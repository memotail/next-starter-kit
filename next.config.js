const path = require('path')
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Dotenv = require('dotenv-webpack')

module.exports = withImages(withCSS({
  distDir: '../.next',
  webpack: (config, {dev, isServer}) => {
    config.resolve = {
      alias: {
        '@': path.resolve(process.cwd(), 'src')
      }
    }

    // module

    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        include: path.resolve('src'),
        exclude: /node_modules/,
        use: ['eslint-loader']
      })
    }

    // plugins

    if (process.env.analyzer) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8090,
        openAnalyzer: true
      }))
    }

    config.plugins.push(new Dotenv({
      path: path.resolve(process.cwd(), '.env', `${process.env.NODE_ENV}.env`)
    }))

    return config
  }
}))
