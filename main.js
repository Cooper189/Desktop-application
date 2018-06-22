const { app, BrowserWindow, ipcMain } = require('electron');
const SendRequest = require('./bin/requestAPI');
const Store = require('./bin/saveData');
const parser = require('./bin/helper')

const store = new Store({
  _dirname: `${__dirname}\\db`,
  configName: 'user-preferences',
  defaults: {}
});

let win;

const api = new SendRequest({
  protocol: 'http:',
  hostname: '127.0.0.1',
  port: 8000
}); 


ipcMain.on('menu:add', (e, item) => {
  api.setParams({
    method: 'GET',
    path: '/records/all/'
  }).sendRequest((result) => {
    win.webContents.send('menu:add', result);
  })
});

ipcMain.on('post:add', (e, item) => {
  const data = store.get('userLogin');

  if (data) {
    win.webContents.send('post:add', JSON.stringify(data));
  } else if (item) {
    api.setParams({
      method: 'POST',
      path: '/login/'
    }).sendRequest((result) => {
      store.set('userLogin', parser(result));
      win.webContents.send('post:add', result);
    }, JSON.stringify(item));
  }
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
// TODO add an error handler
process.on('uncaughtException', (err) => {
  let reg = /CONNECTION_REFused/gi;
  console.log(reg.test(err.message))
})
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})