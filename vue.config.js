const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    entry: {
      index: './src/pages/Index/main.js',
      self: './src/pages/Self/main.js',
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        '~': resolve('node_modules'),
      },
    },
  },
  chainWebpack: (config) => {
    // 如果有其他链式配置需求，可以在这里添加
  },
  pages: {
    index: {
      entry: 'src/pages/Index/main.js', // 实际上这里可以省略，因为我们已经在configureWebpack中设置了
      template: 'public/index.html',
      filename: 'index.html',
      title: '主页'
    },
    self: {
      entry: 'src/pages/Self/main.js', // 同上，可以省略
      template: 'public/index.html',
      filename: 'self.html',
      title: '个人主页'
    }
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