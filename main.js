const { app, BrowserWindow, ipcMain } = require('electron');
const sendRequest = require('./bin/request.module');
const postRequest = require('./bin/postRequest');

let win;

ipcMain.on('menu:add', (e, item) => {
  let options = {
    method: 'GET',
    path: '/records/all/'
  }
  sendRequest(options, (result) => {
    win.webContents.send('menu:add', result);
  })
});
ipcMain.on('post:add', (e, item) => {
  let options = {
    method: 'POST',
    path: '/login/',
    body: JSON.stringify(item)
  }
  postRequest(options, (result) => {
    win.webContents.send('post:add', result);
  })
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