const {join} = require('path');

module.exports = {
  target: 'web',
  mode: 'production',
  entry: join(__dirname, 'src', 'index.ts'),
  output: {
    path: join(__dirname, 'dist'),
    filename: 'ngx-decorators.umd.js',
    libraryTarget: 'umd',
    library: 'ngxDecorators'
  },
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.json'
    ]
  },
  externals: ['tslib'],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: join(__dirname, 'tsconfig-umd.json'),
            context: __dirname,
            colors: true
          }
        }]
      }
    ]
  }
};