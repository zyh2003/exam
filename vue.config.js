const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open: false,
    port: 9999,
    https: false,
    host: 'localhost',
  }
})
