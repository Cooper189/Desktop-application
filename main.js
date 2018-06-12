const { app, BrowserWindow, ipcMain } = require('electron');
const SendRequest = require('./bin/requestAPI');
const api = new SendRequest(); 

let win;

ipcMain.on('menu:add', (e, item) => {
  api.setParams({
    method: 'GET',
    path: '/records/all/'
  }).sendRequest((result) => {
    win.webContents.send('menu:add', result);
  })
});
ipcMain.on('post:add', (e, item) => {
  api.setParams({
    method: 'POST',
    path: '/login/'
  }).sendRequest((result) => {
    win.webContents.send('menu:add', result);
  }, JSON.stringify(item));
});
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/build/static/media/logo.5d5d9eef.svg`
  })
  win.loadURL(`file://${__dirname}/build/index.html`)

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})