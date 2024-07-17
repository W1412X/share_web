const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 如果有其他链式配置需求，可以在这里添加
  },
  devServer: {
    proxy: {
      '/source/': {
        target: 'http://39.101.160.55/source/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});