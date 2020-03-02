const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(common, {
   mode: 'development',
	 devServer: {
		 watchContentBase: true,
		 compress: true,
		 hot: true,
		 host: '0.0.0.0',
		 port: 3000, // port number
		 historyApiFallback: true
	 },
	 devtool: "inline-source-map",
		watchOptions: {
					ignored: ["node_modules"],
					aggregateTimeout: 300,
					poll: 1000
	},


	plugins:[
    new webpack.DefinePlugin({
      FUNIKI_APP_URL: JSON.stringify('http://localhost:8080/api'),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
    })
  ],

});
