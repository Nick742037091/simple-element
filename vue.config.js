const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
let config = {}
let configureWebpack = {}
const mode = process.env.MODE
if (mode === 'example') {
  config = {
    pages: {
      index: {
        entry: 'examples/main.js',
        template: 'public/index.html',
        filename: 'index.html',
      },
    },
    outputDir: 'dist-example',
  }
} else if (mode === 'lib') {
  config = {
    outputDir: 'lib',
  }
  configureWebpack = {
    output: {
      libraryExport: 'default',
      library: 'SimpleElement',
    },
    externals: {
      'element-ui': {
        commonjs: 'element-ui',
        commonjs2: 'element-ui',
        amd: 'element-ui',
        root: 'ELEMENT',
      },
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
      },
    },
  }
}

module.exports = {
  ...config,
  publicPath: `/simple-element/`,
  css: { extract: false },
  devServer: {
    progress: false,
  },
  configureWebpack,
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
  },
}
