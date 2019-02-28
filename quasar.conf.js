// --- dependencies
const fs = require('fs')
const path = require('path')

// --- init root folder
const __root = path.resolve(__dirname)

// --- set app root dirname as global
global.__root = __root

// --- functions
function filterBySvgExtension (filePath) {
  return path.extname(filePath) === '.svg'
}

function getWrappedSvg (filePath) {
  let file = path.resolve(__root, `${ iconsPath }/${ filePath }`)
  let fileName = path.basename(file, '.svg')
  let html = fs.readFileSync(file, encoding)
  let matches = getAllSvgMatches(html)

  try {
    let viewBox = getViewBox(matches)
    let svgContent = getSvgContent(matches)
    return `
      <symbol id="${ fileName }" viewBox="${ viewBox }">
        ${ svgContent }
      </symbol>
    `
  }
  catch (error) {
    // --- skip
    console.error(error)
  }

  return ''
}

function getAllSvgMatches (html) {
  let pattern = /(<([^>]+)>)/ig
  return html.match(pattern)
}

function getSvgContent (matches = []) {
  return matches.splice(1, matches.length - 2)
}

function getViewBox (matches = []) {
  let pattern = /viewBox="([^"]*)"/
  let viewBoxes = matches[0].match(pattern)
  return (Array.isArray(viewBoxes)) ? viewBoxes[1] : ''
}

function getIconsAsHTML () {
  let html = icons.map(getWrappedSvg).join('')
  return `
    <svg xmlns="http://www.w3.org/2000/svg" hidden>
      ${ html }
    </svg>
  `
}

function addAliasesToWebpack (cfg) {
  cfg.resolve.alias = {
    ...cfg.resolve.alias,
    '@': path.resolve(__root, './src'),
    'styl': path.resolve(__root, './src/css'),
    'utils': path.resolve(__root, './src/assets/utils')
  }
}

// --- other variables
const [iconsPath, encoding] = ['./src/assets/icons', 'utf-8']
const folder = path.resolve(__root, iconsPath)
const icons = fs.readdirSync(folder).filter(filterBySvgExtension)

// Configuration for your app
module.exports = function (ctx) {
  return {
    // -- custom html variables
    htmlVariables: {
      icons: getIconsAsHTML()
    },
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios',
      'utils'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      // ctx.theme.mat ? 'roboto-font' : null,
      'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
        void addAliasesToWebpack(cfg)
      }
    },
    devServer: {
      // https: true,
      port: 8080,
      open: false // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutFooter',
        'QPageContainer',
        'QPage',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QBtn',
        'QRating',
        'QIcon',
        'QTooltip',
        'QVideo',
        'QCarousel',
        'QCarouselSlide',
        'QCarouselControl',
        'QSelect',
        'QSpinnerGrid'
      ],
      cssAddon: true,
      directives: [],
      // Quasar plugins
      plugins: [],
      iconSet: 'material-icons',
      // Quasar language
      i18n: 'en-us'
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
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        void addAliasesToWebpack(cfg)
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
      }
    }
  }
}
