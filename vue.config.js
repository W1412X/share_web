const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:process.env.NODE_ENV='production'?'./':'./',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '充实的大学生活';
      return args;
    });

  },
  devServer: {
    proxy: {
    }
  },
  publicPath: './'
});