module.exports = {
  plugins: [
    require('postcss-easy-import')({prefix: '_'}),
    require('postcss-flexbugs-fixes'),
    require('postcss-nested'),
    require('autoprefixer')({
      browsers: [
        '>1% in CN',
        'last 4 versions',
        'Firefox ESR',
        'ie > 8'
      ]
     })
  ]
}
