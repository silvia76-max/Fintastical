/* eslint-disable no-undef */


const path = require('path')
const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  const options = {
    webpackOptions: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../../src/views'),
        },
      },
    },
  }

  on('file:preprocessor', webpack(options))
  return config
}
