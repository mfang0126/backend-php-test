module.exports = {
  devServer: {
    compress: true,
    port: 8080,
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:1337'
      }
    }
  }
}
