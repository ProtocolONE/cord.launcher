import { ipcMain } from 'electron'
import store from './store'

ipcMain.on('update-route-url', (_, route) => store.set('route', route))
