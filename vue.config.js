const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
let config = {}
const mode = process.env.MODE
if (mode === 'example') {
  config = {
    pages: {
      index: {
        entry: 'examples/main.js',
        template: 'public/index.html',
        filename: 'index.html'
      }
    },
    outputDir: 'dist-example'
  }
} else if (mode === 'lib') {
  config = {
    outputDir: 'lib'
  }
}

module.exports = {
  ...config,
  publicPath: `/simple-element/`,
  css: { extract: false },
  devServer: {
    progress: false
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@pkg', resolve('packages'))
      .set('@example', resolve('examples'))
    // 使图片转为base64
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 99999 }))
  }
}
