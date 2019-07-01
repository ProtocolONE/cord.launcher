import { app, BrowserWindow } from 'electron'
import { join } from 'path'

import './ipc-main'

import store from './store'

global.$electron_store = store

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let main_window

function handle_move_and_resize () {
  store.set('window_bounds', { ...main_window.getBounds() })
}

function createWindow () {
  let { x, y, width, height } = store.get('window_bounds')

  /**
   * Initial window options
   */
  main_window = new BrowserWindow({
    x,
    y,
    width,
    height,
    center: (x === null && y === null),
    useContentSize: true,
    webPreferences: {
      // --- TODO: off devtools in future
      devTools: true,
      nodeIntegration: true
    }
  })

  main_window.loadURL(process.env.APP_URL)

  main_window.on('moved', handle_move_and_resize)
  main_window.on('resize', handle_move_and_resize)

  main_window.on('closed', () => {
    main_window = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (main_window === null) {
    createWindow()
  }
})

app.on('ready', createWindow)
