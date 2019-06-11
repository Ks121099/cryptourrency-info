const { app, BrowserWindow, Menu,shell} = require('electron')
const path=require('path')
const url= require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
      width: 800,
    height: 600,
  })

  // and load the index.html of the app.
  win.loadFile('/src/index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  var menu= Menu.buildFromTemplate([
  {
      label:'Menu',
      submenu: [
          {label:'new'},
          {
              label:'Market cap',
                click(){
                    shell.openExternal('http://kunalsinha.tech')
                }
           
            },
           {
                label:'Exit',
                click(){
                    app.quit()
                }
                }
        ]
  }
  ])
  Menu.setApplicationMenu(menu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})