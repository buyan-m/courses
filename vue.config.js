const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/static',
    devServer: {
        https: {
            key: '../https/rootCA.key',
            cert: '../https/rootCA.crt',
        },
        proxy: {
            '^/api': {
                target: 'http://0.0.0.0:3000/',
                pathRewrite: { '^/api': '' },
            },
        },
    },

    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ],
        },
    },

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableLegacy: true,
            runtimeOnly: false,
            compositionOnly: true,
            fullInstall: true,
        },
    },
})
