
module.exports = {
  productionSourceMap:false,
  // 关闭eslint
  lintOnSave:false,
  // 配置代理服务器
  devServer:{
    proxy:{
      '/api' :{
        // 代理的目标路径
        target:' http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api' : ''}
      }
    }
  }
}