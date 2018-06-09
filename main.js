const { app, BrowserWindow, ipcMain, net } = require('electron')

let win;

ipcMain.on('menu:add', function(e, item) {
  console.log(item);
  sendRequest()
});

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/build/static/media/logo.5d5d9eef.svg`
  })
  win.loadURL(`file://${__dirname}/build/index.html`)

  win.webContents.openDevTools()

  win.on('closed', function () {
    win = null
  })
  // win.webContents.send('menu:add', );
  
}
function sendRequest() {
  //http://127.0.0.1:8000/test/
  let temp;
  const request = net.request({
    method: 'GET',
    protocol: 'http:',
    hostname: '127.0.0.1',
    port: 8000,
    path: '/records/all/'
  })
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
      win.webContents.send('menu:add', chunk);
    })
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  request.end();
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})