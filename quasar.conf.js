const webpack = require('webpack')
const { resolve } = require('path')

const __root = resolve(__dirname)
const isProd = (process.env.NODE_ENV === 'production')

global.__root = __root

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'moment',
      'i18n',
      'trans',
      'update-locale',
      'open-url',
      'base-components'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      'roboto-font',
      'fontawesome'
    ],
    supportIE: false,
    build: {
      // --- https://quasar-framework.org/guide/app-quasar.conf.js.html
      showProgress: true,
      scopeHoisting: true,

      vueCompiler: true,
      vueRouterMode: 'abstract',

      analyze: process.env.ANALYZE,
      preloadChunks: true,

      minify: isProd,
      extractCSS: isProd,

      sourceMap: !isProd,
      devtool: 'cheap-eval-source-map',

      extendWebpack (cfg) {
        cfg.resolve.extensions.push('.ts')
        cfg.module.rules.push(...[
          {
            test: /\.pug$/,
            loader: 'pug-plain-loader'
          },
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true
            }
          },
          {
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
          }
        ])
        cfg.resolve.alias['@'] = resolve(__root, 'src')
        cfg.plugins.push(
          new webpack.LoaderOptionsPlugin({
            minimize: isProd,
            options: {
              context: resolve(__root, 'src'),
              stylus: {
                import: [
                  resolve(__root, 'src', 'css', 'global.styl')
                ]
              }
            }
          })
        )
      }
    },
    // framework: 'all' --- includes everything; for dev only!
    devServer: {
      port: 8080,
      open: false
    },
    framework: {
      components: [
        // --- layouts
        'QLayout',
        'QLayoutHeader',
        'QLayoutFooter',

        // --- pages
        'QPageContainer',
        'QPage',

        // --- sliders
        'QCarousel',
        'QCarouselSlide',

        // --- tabs
        'QTabs',
        'QTab',
        'QTabPane',

        // --- cards
        'QCard',
        'QCardTitle',
        'QCardSeparator',
        'QCardMain',

        // --- forms
        'QInput',
        'QSelect',
        'QSearch',

        // --- other components
        'QBtn',
        'QIcon',
        'QTooltip',
        'QRating'
      ],
      cssAddon: true,
      directives: [
        'Ripple'
      ],
      // Quasar plugins
      plugins: [
        'Notify'
      ],
      iconSet: 'fontawesome',
      i18n: 'en-us' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'

        appId: 'com.qilincord.app',
        productName: 'qilincord',
        artifactName: '${productName}-${version}.${ext}',
        copyright: 'Copyright © 2019 ${author}',
        mac: {
          category: 'qilincord',
          target: ['zip', 'dmg']
        },
        linux: {
          synopsis: 'qilincord',
          target: ['zip', 'deb']
        },
        win: {
          target: ['zip', 'nsis']
        }
      }
    }
  }
}
