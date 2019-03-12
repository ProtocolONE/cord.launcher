// --- dependencies
const fs = require('fs')
const path = require('path')
const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed

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

function envparser () {
  for (let key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      parsedEnv[key] = JSON.stringify(parsedEnv[key])
    }
  }
  return parsedEnv
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
    plugins: ['i18n', 'axios', 'utils'],
    css: ['app.styl'],
    extras: ['material-icons'],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      vueCompiler: true,
      extractCSS: true,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
        addAliasesToWebpack(cfg)
      },
      env: envparser()
    },
    devServer: {
      port: 8080,
      open: false
    },
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
      plugins: [],
      iconSet: 'material-icons',
      i18n: 'en-us'
    },
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      manifest: {
        name: 'cord.launcher',
        short_name: 'cord.launcher-PWA',
        description: 'Cord\'s web and electron app using PWA',
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
      bundler: 'builder',
      extendWebpack (cfg) {},
      builder: {
        // https://www.electron.build/configuration/configuration
        appId: 'com.github.ProtocolONE.cord.launcher',
        productName: 'qilincord',
        artifactName: '${productName}-setup-${version}.${ext}',
        copyright: 'Copyright © ' + new Date().getFullYear() + ' ${author}',
        mac: {
          category: 'qilincord.launcher',
          target: ['zip', 'dmg']
        },
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
        }
      }
    }
  }
}
