'use strict'
const path = require('path')

module.exports = {
	mutiplePages: false, //是否是多页面
	alias:{
		'@component' : path.join(__dirname, '../src/components'),
		'@bpmn': path.join(__dirname, '../src/components/bpmn'),
		'@index': path.join(__dirname, '../src/pages/index')
	},
	dev: {
		host: '0.0.0.0',
		port:'8087',
		showEslintErrorsInOverlay:false,
		assetsPublicPath: '/',
		useEslint: false,
		assetsSubDirectory: 'static',
		autoOpenBrowser: false,
		errorOverlay: true,
		poll: false,
		notifyOnErrors: true,
		proxyTable:{
			"/flow-api": {
				target: "http://192.168.8.53:41119/",
				pathRewrite:{'^/flow-api': ''},
				changeOrigin: true
			}
		}
	},
	build: {
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsPublicPath:'./',
		assetsSubDirectory: 'static',
		productionSourceMap: false,
		productionGzip: true,
    	productionGzipExtensions: ['js', 'css'],
		bundleAnalyzerReport: false
	}
}