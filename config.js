const path = require('path')

exports.html = {
  title: 'Vue Issue Helper',
  description: 'Help create better bug reports and pull requests for Vue and related repositories',
  template: path.resolve(__dirname, 'index.html')
}

exports.webpack = config => {
  config.module.rules.push({
    test: /\.md$/,
    use: 'raw-loader'
  })
  return config
}
