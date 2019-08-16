const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'element-ui': 'ELEMENT',
  echarts: 'echarts',
  quill: 'Quill',
  moment: 'moment'
}
const cdn = {
  css: [
    'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.snow.min.css'
  ],
  js: [
    'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.7/vue-router.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/vuex/3.1.1/vuex.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.11.1/index.js',
    'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.2.1/echarts.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
  ]
}
const IS_PROD = process.env.NODE_ENV === 'production'
module.exports = {
  publicPath: process.env.BASE_URL,
  lintOnSave: true,
  productionSourceMap: true,

  devServer: {
    port: 8088,
    host: '0.0.0.0',
    open: true, // 自动打开浏览器,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        ws: true,
        changeOrigin: true
      }
    }
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      // 设置 scss 公用变量文件
      sass: {
        data: `@import '~@/assets/style/public.scss';`
      }
    }
  },

  parallel: require('os').cpus().length > 1,

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
    // 解决 cli3 热更新失效
    config.resolve.symlinks(true)
    // 注入CDN地址
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
    // 重新设置 alias
    config.resolve.alias
      .set('@api', resolve('src/api'))
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },

  configureWebpack: config => {
    config.externals = externals
    if (IS_PROD) {
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
      )
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log']// 移除console
            },
            warnings: false
          },
          sourceMap: false,
          parallel: true
        })
      )
    }
  }
}
