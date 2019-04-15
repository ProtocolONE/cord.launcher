const webpack = require('webpack')
const { resolve } = require('path')

const __root = resolve(__dirname)
const isProd = (process.env.NODE_ENV === 'production')

const electronPlugins = []

const isElectron = (process.env.MODE === 'electron')
const channel = (process.env.CHANNEL || 'stable')

global.__root = __root

if (isElectron) {
  electronPlugins.push('auto-update-manager')
}

module.exports = function () {
  return {
    // html vars
    htmlVariables: {
      title: (isElectron)
        ? 'cordlauncher ' + process.env.npm_package_version
        : 'cordlauncher'
    },
    // app plugins (/src/plugins)
    plugins: [
      'toggle-online-state',
      'moment',
      'i18n',
      'trans',
      'update-locale',
      'open-url',
      'base-components',

      // --- electron plugins
      ...(isElectron ? ['auto-update-manager'] : [])
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
      pwa: isElectron
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'cordlauncher',
        short_name: 'cordlauncher-PWA',
        description: 'Cord launcher based on Electron and Wep Application',
        display: 'standalone',
        theme_color: '#027be3',
        background_color: '#ffffff',
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
      bundler: 'builder',
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      builder: {
        // https://www.electron.build/configuration/configuration
        appId: 'protocol.one.cordlauncher.app',
        productName: 'cordlauncher',
        copyright: 'Copyright © 2019 ${author}',
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
          target: [
            'dmg',
            'zip'
          ]
        },
        win: {
          verifyUpdateCodeSignature: false
        },
        linux: {
          target: [
            'AppImage'
          ]
        },
        publish: {
          url: `https://cordfiles.protocol.one/dist/releases/${ channel }`,
          provider: 'generic',
          channel
        }
      }
    }
  }
}
