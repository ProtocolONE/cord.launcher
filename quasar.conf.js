// Configuration for your app
const { mapValues } = require('lodash')

const env = require('./config')
const channel = (process.env.CHANNEL || 'stable')

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'axios',
      'trans'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      // optional, you are not bound to it
      'material-icons',
      // 'ionicons-v4',
      // 'mdi-v3',
      'fontawesome-v5'
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        // --- layouts
        'QLayout',
        'QHeader',
        'QFooter',

        // --- pages
        'QPageContainer',
        'QPage',

        // --- forms
        'QForm',
        'QBtn',
        'QInput',
        'QCheckbox',

        // --- cards
        'QCard',
        'QCardSection',
        'QCardActions',

        // --- tabs
        'QTabs',
        'QTab',
        'QTabPanels',
        'QTabPanel',

        // --- tables
        'QTable',
        'QTh',
        'QTr',
        'QTd',

        // --- list
        'QList',
        'QItem',
        'QItemSection',

        // --- toolbar
        'QToolbar',
        'QToolbarTitle',

        // --- dropdown
        'QBtnDropdown',

        // --- modals
        'QDialog',

        // --- other
        'QSeparator',
        'QAvatar',
        'QSpinner',
        'QInnerLoading',
        'QRating',
        'QSpace',
        'QIcon',
        'QImg',
        'QVideo'
      ],

      cssAddon: true,

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'LocalStorage'
      ]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      env: mapValues(env, val => {
        if (typeof val === 'string') {
          return JSON.stringify(val)
        }
        return val
      }),
      // env: JSON.stringify(env),
      scopeHoisting: true,
      publicPath: '/',
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push(...[
          {
            test: /\.pug$/,
            loader: 'pug-plain-loader'
          },
          {
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
          }
        ])
      }
    },

    devServer: {
      // https: true,
      // port: env.PUBLIC_PORT,
      open: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      }
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
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

    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },

    electron: {
      bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        appId: 'protocol.one.cordlauncher.app',
        productName: 'cordlauncher',
        // eslint-disable-next-line no-template-curly-in-string
        copyright: 'Copyright © 2019 ${author}',
        artifactName: (function () {
          return (channel === 'stable')
            // eslint-disable-next-line no-template-curly-in-string
            ? '${productName}-${version}.${ext}'
            // eslint-disable-next-line no-template-curly-in-string
            : '${productName}-${channel}-${version}.${ext}'
        })(),
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            }
          ]
        },
        mac: {
          category: 'public.app-category.games',
          target: ['dmg', 'zip']
        },
        win: {
          verifyUpdateCodeSignature: false,
          signingHashAlgorithms: ['sha256']
        },
        linux: {
          target: ['AppImage']
        },
        publish: {
          url: `https://cordfiles.protocol.one/dist/releases/${channel}`,
          provider: 'generic',
          channel
        }
      }
    }
  }
}
