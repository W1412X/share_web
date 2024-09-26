const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '充实的大学生活';
      return args;
    });
  },
  devServer: {
    proxy: {}
  }
});
