const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const debug = process.env.NODE_ENV !== 'production'
let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'
module.exports = {
    publicPath: '',
    devServer: {
        port: 9999
    },
    configureWebpack: {
        output: {
            sourcePrefix: ' '
        },
        amd: {
            toUrlUndefined: true
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
                'cesium': path.resolve(__dirname, cesiumSource)
            }
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: path.join(cesiumSource, cesiumWorkers),
                to: 'Workers'
            }]),
            new CopyWebpackPlugin([{
                from: path.join(cesiumSource, 'Assets'),
                to: 'Assets'
            }]),
            new CopyWebpackPlugin([{
                from: path.join(cesiumSource, 'Widgets'),
                to: 'Widgets'
            }]),
            new CopyWebpackPlugin([{
                from: path.join(cesiumSource, 'ThirdParty/Workers'),
                to: 'ThirdParty/Workers'
            }]),
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('./')
            }),
            new CopyWebpackPlugin([{
                from: path.join('./static', 'model'),
                to: 'model3D'
            }]),
            new CopyWebpackPlugin([{
                from: path.join('./static', 'images'),
                to: 'images'
            }])
        ]
    }
}