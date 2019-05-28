import {
  app,
  BrowserWindow,
  Menu,
  Tray,
  ipcMain,
  nativeImage
} from 'electron'

import { join } from 'path'

import templateMenu from './template-menu'
import Store from '../store'
import AutoUpdateManager from './auto-update-manager'

const LOADING_WINDOW_WIDTH = 600
const LOADING_WINDOW_HEIGHT = 600

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    route: null,
    login: false,
    channel: 'stable',
    windowBounds: {
      width: LOADING_WINDOW_WIDTH,
      height: LOADING_WINDOW_HEIGHT,
      fullscreen: false
    }
  }
})

const autoUpdater = new AutoUpdateManager(store.get('channel') || 'stable')

app.$store = store

let mainWindow = null
let mainTray = null
let mainIcons = {
  darwin: join(__dirname, 'statics', 'icons', 'apple-icon-152x152.png'),
  win32: join(__dirname, 'statics', 'icons', 'ms-icon-144x144.png'),
  linux: join(__dirname, 'statics', 'icons', 'icon-512x512.png')
}

if (process.env.DEV) {
  mainIcons = {
    darwin: join(__dirname, '..', '..', 'src', 'statics', 'icons', 'apple-icon-152x152.png'),
    win32: join(__dirname, '..', '..', 'src', 'statics', 'icons', 'ms-icon-144x144.png'),
    linux: join(__dirname, '..', '..', 'src', 'statics', 'icons', 'icon-512x512.png')
  }
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
}
else {
  /**
   * Set `__statics` path to static files in production;
   * The reason we are setting it here is that the path needs to be evaluated at runtime
   */
  if (process.env.PROD) {
    global.__statics = join(__dirname, 'statics').replace(/\\/g, '\\\\')
  }

  const handleMovedOrResize = () => {
    let [bounds, fullscreen] = [mainWindow.getBounds(), mainWindow.isFullScreen()]
    store.set('windowBounds', { ...bounds, fullscreen })
  }

  const createWindow = () => {
    /**
     * Initial window options
     */
    let baseConfig = (store.get('login')) ? store.get('windowBounds') : {}

    mainWindow = new BrowserWindow({
      width: LOADING_WINDOW_WIDTH,
      height: LOADING_WINDOW_HEIGHT,
      route: '/auth',
      center: true,
      useContentSize: true,
      webPreferences: {
        devTools: process.env.DEV,
        nodeIntegration: true
      },
      // --- TODO: do it in future !
      // --- TODO: app without frame with custom window
      frame: false,
      transparent: false,
      ...baseConfig
    })

    mainWindow.loadURL(process.env.APP_URL)

    mainWindow.on('moved', handleMovedOrResize)
    mainWindow.on('resize', handleMovedOrResize)

    mainWindow.on('close', e => {
      if (!app.isQuiting) {
        e.preventDefault()
        mainWindow.hide()
        if (process.platform === 'darwin') {
          app.dock.hide()
        }
      }
      return false
    })

    mainWindow.on('closed', () => {
      mainWindow = null
    })

    mainWindow.webContents.on('did-frame-finish-load', () => autoUpdater.init(mainWindow))

    let ctxMenu = Menu.buildFromTemplate([
      {
        label: 'Qilincord',
        click () {
          mainWindow.show()
          if (process.platform === 'darwin') {
            app.dock.show()
          }
        }
      },
      {
        label: 'Quit',
        click () {
          app.isQuiting = true
          app.quit()
        }
      }
    ])

    let iconPath = mainIcons[process.platform]

    if (process.platform === 'darwin') {
      mainTray = new Tray(
        nativeImage
          .createFromPath(iconPath)
          .resize({
            width: 16,
            height: 16
          })
      )
    }
    else {
      mainTray = new Tray(iconPath)
    }

    mainTray.setToolTip('Qilincord')
    mainTray.setContextMenu(ctxMenu)

    mainTray.on('click', () => {
      if (mainWindow) {
        mainWindow.show()
        mainWindow.focus()
      }
    })

    mainTray.on('right-click', () => {
      if (mainWindow) {
        mainWindow.show()
        mainWindow.focus()
      }
    })
  }

  app.on('second-instance', () => {
    if (mainWindow) {
      mainWindow.show()
      mainWindow.focus()
    }
  })

  ipcMain.on('change-channel', (_, value) => {
    store.set('channel', value)
    autoUpdater.updateChannel(value)
  })

  ipcMain.on('e-minimize', () => mainWindow.minimize())

  let isMaximized = false
  ipcMain.on('e-fullscreen', (e, data) => {
    let { width, height } = data

    if (isMaximized) {
      width = Math.round(width / 1.5)
      height = Math.round(height / 1.5)
      isMaximized = false
    }
    else {
      isMaximized = true
    }

    mainWindow.setSize(width, height)
    mainWindow.center()
  })

  ipcMain.on('e-close', () => app.quit())

  ipcMain.on('e-login', (e, data) => {
    let { width, height } = data
    mainWindow.setSize(width, height)
    mainWindow.center()
  })

  ipcMain.on('e-logout', () => {
    mainWindow.setSize(LOADING_WINDOW_WIDTH, LOADING_WINDOW_HEIGHT)
    mainWindow.center()
  })

  app.on('window-all-closed', () => app.quit())

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })

  app.on('ready', () => {
    Menu.setApplicationMenu(
      Menu.buildFromTemplate(templateMenu)
    )
    createWindow()
  })
}
