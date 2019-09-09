'use strict'

const utils = require('./utils')
const webpack = require('webpack')
const express = require('express')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
	'vue-style-loader',
    {
      loader: 'css-loader',
      options: cssOptions
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
		  require('postcss-import')
        ]
      }
    }
  ]
  if (preProcessor) {
    loaders.push(preProcessor);
  }
  return loaders
}

const htmlPlugins = ()=> {
	var arr = []
	config.mutiplePages ? 
	Object.keys(baseWebpackConfig['entry']).map(fileName => {
		arr.push(new HtmlWebpackPlugin({
			filename: fileName + '.html',
			template:  `./src/pages/${fileName}/index.html`,
			chunks: [fileName, 'manifest', 'vendor'],
			inject: true,
			hash: true, // 为静态资源生成hash值
		}))
	})
	:
	arr.push(new HtmlWebpackPlugin({
		filename: 'index.html',
		template:  `./src/pages/index/index.html`,
		chunks: ['index', 'manifest', 'vendor'],
		inject: true,
		hash: true, // 为静态资源生成hash值
	}))
	return arr
}

const devWebpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: [
			{
				test: /\.css$/,
					use: getStyleLoaders({
						importLoaders: 1
					})
			},
			{
				test: /\.less$/,
				use: getStyleLoaders({
					importLoaders: 2
				}, {
					loader: 'less-loader',
					options: {
						modifyVars: {
							'primary-color': '#52B415'
						},
						javascriptEnabled: true,
					}
				})
			},
		]
	},
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		clientLogLevel: 'warning',
		hot: true,
		contentBase: false, 
		compress: true,
		host: HOST || config.dev.host,
		port: PORT || config.dev.port,
		open: config.dev.autoOpenBrowser,
		overlay: config.dev.errorOverlay ? {
			warnings: false,
			errors: true
		} : false,
		publicPath: config.dev.assetsPublicPath,
		proxy: config.dev.proxyTable,
		quiet: true, // necessary for FriendlyErrorsPlugin
		watchOptions: {
			poll: config.dev.poll,
		}
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			'process.env.NODE_ENV_CONFIG': JSON.stringify(process.env.NODE_ENV_CONFIG)
		}),
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, '../static'),
			to: config.dev.assetsSubDirectory,
			ignore: ['.*']
		}]),
		new MiniCssExtractPlugin({
			filename: utils.assetsPath('css/[name].[contenthash].css'),
			allChunks: true,
		}),
	].concat(htmlPlugins())
})

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || config.dev.port
	portfinder.getPort((err, port) => {
		if(err) {
			reject(err)
		} else {
			process.env.PORT = port
			devWebpackConfig.devServer.port = port
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
				compilationSuccessInfo: {
				messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
				},
				onErrors: config.dev.notifyOnErrors ?
				utils.createNotifierCallback() : undefined
			}))
			let app = express()
	  		app.use('/', express.static(path.resolve(__dirname, '../src')));
			// app.listen(port)
			resolve(devWebpackConfig)
		}
	})
})
