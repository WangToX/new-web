const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // host: '0.0.0.0',
    // port: 8080,
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: 'http://vue.ruoyi.vip',
        changerOrigin: true,
        pathRewrite: { 
          ['^' + process.env.VUE_APP_BASE_URL]: '/prod-api'
        },
      },
    },
  },
  // 解决引入path库爆红报错问题
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
      },
    },
  },
  chainWebpack: (config) => {
    // twig rule loader
    const twigRule = config.module.rule('twig')
    twigRule.exclude.add(/node_modules/)
    // 添加新的loader处理
    twigRule
      .test(/\.twig$/)
      .use('twig-loader')
      .loader('twig-loader')
      .end()

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
