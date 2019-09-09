'use strict'

const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const getStyleLoaders = (cssOptions, preProcessor) => {
	const loaders = [{
			loader: MiniCssExtractPlugin.loader,
			options: Object.assign({}, {
				publicPath: '../'
			})
		},
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
				],
				sourceMap: config.build.productionSourceMap,
			}
		}
	]
	if (preProcessor) {
		loaders.push({
			loader: preProcessor.loader,
			options: {
				sourceMap: config.build.productionSourceMap,
				...preProcessor.options
			},
		});
	}
	return loaders
}

const htmlPlugins = () => {
	var arr = []
	config.mutiplePages ?
		Object.keys(baseWebpackConfig['entry']).map(fileName => {
			arr.push(new HtmlWebpackPlugin({
				filename: fileName + '.html',
				template: `./src/pages/${fileName}/index.html`,
				chunks: [fileName, 'manifest', 'vendor', 'app'],
				inject: true,
				hash: true, // 为静态资源生成hash值
			}))
		}) :
		arr.push(new HtmlWebpackPlugin({
			filename: 'index.html',
			template: `./src/pages/index/index.html`,
			chunks: ['index', 'manifest', 'vendor', 'app', 'vue-vendor'],
			inject: true,
			hash: true, // 为静态资源生成hash值
		}))
	return arr
}

const webpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].[chunkhash].js'),
		chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: getStyleLoaders({
					importLoaders: 1,
					sourceMap: config.build.productionSourceMap,
				}),
				// exclude: /node_modules/,
				sideEffects: true
			},
			{
				test: /\.less$/,
				use: getStyleLoaders({
					importLoaders: 2,
					sourceMap: config.build.productionSourceMap,
				}, {
					loader: 'less-loader',
					options: {
						modifyVars: {
							'primary-color': '#52B415'
						},
						javascriptEnabled: true,
					}

				}),
				// exclude: /node_modules/,
				sideEffects: true
			},
		]
	},
	devtool: false,
	optimization: {
		minimize: true,
		runtimeChunk: {
			name: 'manifest'
		},
		minimizer: [
			new OptimizeCSSPlugin({
				cssProcessorOptions: config.build.productionSourceMap ? {
					safe: true,
					map: {
						inline: false
					}
				} : {
					safe: true
				}
			}),
			new UglifyJsPlugin({
				uglifyOptions: {
					compress: {
						// warnings: false,
						drop_console: true
					}
				},
				sourceMap: config.build.productionSourceMap,
				parallel: true
			}),
		],
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				vendor: {
					name: 'vendor',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					//   priority: -10,
				},
				'vue-vendor': {
					name: 'vue-vendor',
					test: module => (/vue/.test(module.context) || /axios/.test(module.context)),
					priority: 3,
					reuseExistingChunk: false
				},
				commons: {
					name: "app",
					chunks: "initial",
					minChunks: 2,
				},
			}
		}
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.env.NODE_ENV_CONFIG': JSON.stringify(process.env.NODE_ENV_CONFIG)
		}),
		new webpack.HashedModuleIdsPlugin(),
		new MiniCssExtractPlugin({
			filename: utils.assetsPath('css/[name].[contenthash].css'),
			allChunks: true,
		}),
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, '../static'),
			to: config.build.assetsSubDirectory,
			ignore: ['.*']
		}]),
	].concat(htmlPlugins())
})

if (config.build.productionGzip) {
	const CompressionWebpackPlugin = require('compression-webpack-plugin')

	webpackConfig.plugins.push(
		new CompressionWebpackPlugin({
			filename: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(' +
				config.build.productionGzipExtensions.join('|') +
				')$'
			),
			threshold: 10240,
			minRatio: 0.8
		})
	)
}

if (config.build.bundleAnalyzerReport) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
	webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig