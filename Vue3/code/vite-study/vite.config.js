
export default {
  proxy: {
    '/api': {
      // 使用 api 时代理
      target: 'httpL//v.juhe.cn',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}