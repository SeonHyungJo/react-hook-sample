module.exports = {
  // 엔트리 포인트를 잡아준다.
  entry: './src/index.js',

  // 엔트리를 기준으로 관련 모듈을 번들링한다.
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },

  mode: 'development',

  // 서버관련 설정을 진행
  devServer: {
    inline: true,
    port: 3000,
    contentBase: __dirname + '/public/'
  },

  // react es6 기준으로 작성을 함에 따라 트랜스파일링을 해준다.
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
