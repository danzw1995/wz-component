var path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

var config = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('components', resolve('./src/components'))
      .set('common', resolve('./src/common'))
      .set('pages', resolve('./src/pages'))
  },
}

module.exports = config