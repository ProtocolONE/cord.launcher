import {
  app,
  BrowserWindow,
  ipcMain } from 'electron'

import mainWindow from './main-window'
import Store from './store'
import checkLogin from './check-login'

import { merge } from 'lodash'

const store = app.$store =
  new Store({
    configName: 'user-preferences',
    defaults: {
      route: null,
      token: null,
      isLogged: checkLogin(),
      channel: 'stable',
      windowBounds: {
        x: 0,
        y: 0,
        width: 800,
        height: 800,
        fullscreen: false
      }
    }
  })

function handleReady () {
  let isLogged = store.get('isLogged')

  let defaultOptions = {
    useContentSize: true,
    webPreferences: {
      devTools: process.env.DEV
      // TODO: add sentry
    }
  }

  let loginOptions = {
    width: 600,
    height: 600,
    frame: false,
    transparent: true
  }

  let options = {}

  if (isLogged) {
    options = merge(options, defaultOptions, store.get('windowBounds'))
  }
  else {
    options = merge(options, loginOptions)
  }

  mainWindow.app = new BrowserWindow(options)
  mainWindow.app.loadURL(process.env.APP_URL)

  mainWindow.app.on('closed', () => { mainWindow.app = null })
}

app.on('ready', handleReady)

ipcMain.on('logged', (e, isLogged) => {
  store.set('isLogged', isLogged)
  app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
  app.exit(0)
})
