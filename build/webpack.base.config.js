'use strict'

const path = require('path');
const fs = require('fs');
const utils = require('./utils');
const config = require('../config');
const HappyPack = require('happypack');
const os = require('os')

// const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})


function getEntries() {
	const pagesPath = path.resolve('./src/pages')
	var result = fs.readdirSync(path.resolve('./src/pages'))
	var entry = {};
	result.forEach(item => {
		entry[item] = `./src/pages/${item}/main.js`
	})
	return entry
}

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: config.mutiplePages ? {index: './src/pages/index/index.js'} : getEntries(),
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'development' ?
		config.dev.assetsPublicPath :
		config.build.assetsPublicPath
	},
	resolve:{
		extensions: ['.js', '.vue', '.json'],
		modules: [
			resolve('src'),
			resolve('node_modules')
		],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			...config.alias
		}
	},
	module:{
		rules: [
			...(config.dev.useEslint ? [createLintingRule()] : []),
			{
				test: /\.vue$/,
        		loader: 'vue-loader',
			},
			{
				test: /\.bpmn$/,
        		loader: 'raw-loader',
			},
			{
				test: /\.js$/,
				use:['happypack/loader?id=babel'],
				// loader: 'babel-loader',
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
				limit: 200000,
				name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
				limit: 10000,
				name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
				limit: 10000,
				name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	},
	plugins:[
		new HappyPack({
			id: 'babel',
			loaders:['babel-loader']
			// threadPool: happyThreadPool
		})
	],
	node: {
		setImmediate: false,
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	},
	externals: {

	}
}