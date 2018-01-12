const webpack = require('webpack');
const path = require('path');

module.exports = {
	// メインTSX
	entry: './src/ts/main.ts',
	// メインJSの出力設定
	output: {
		path: path.resolve(__dirname, 'public_html/js'),
		filename: '[name].js'
	},
	// Loaderによるタスク処理
	module: {
		rules: [
			// Sassコンパイル
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						// url()で指定した画像は含めない
						options: {url: false}
					},
					{
						loader: 'sass-loader',
						// Compassを含める
						options: {includePaths: ['node_modules/compass-mixins/lib']}
					}
				]
			},
			// TypeScriptコンパイル
			{
				// 末尾に「?」を忘れないこと！.tsファイルをインポートできなくなる
				test: /\.tsx?$/,
				use: 'awesome-typescript-loader',
				exclude: path.resolve(__dirname, 'node_modules')
			},
			// ソースマップ出力
			{
				test: /\.js$/,
				use: 'source-map-loader',
				enforce: 'pre'
			}
		]	// End rules
	},
	// plugins
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			comments: false
		})
	],
	// TS、TSXを含めるように
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},
	// ソースマップを有効にする
	devtool: 'source-map',
	externals: {
		"jquery": "jQuery"
	}
};
