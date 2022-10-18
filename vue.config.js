const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //项目打包的时候不要map文件，减小文件体积
  productionSourceMap: false,
  publicPath:'./',
  transpileDependencies: true,
  //关闭语法检查
  lintOnSave: false,
  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        target:'http://39.98.123.211:8510',
      }
    }
  }
})
