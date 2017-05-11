const DEBUG_MODE = false

//Electron Setup
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

// Keep a global reference of the window object
let mainWindow

function createWindow ()
{
  //Window should not be resizable if we're not in debug mode
  mainWindow = new BrowserWindow({width: 800, height: 600, minWidth: 800, minHeight:600, icon: __dirname + '/app.ico', resizable: DEBUG_MODE})
  //Disable the menu bar for aesthetic reasons if we're not debugging
  if(!DEBUG_MODE) mainWindow.setMenu(null)
  //Load the app.html file
  mainWindow.loadURL(url.format(
  {
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true
  }))


  //Emitted when the window is closed.
  mainWindow.on('closed', function ()
  {
    mainWindow = null
  })
}

app.on('ready', createWindow)

//Quit when all windows are closed.
app.on('window-all-closed', function ()
{
  if (process.platform !== 'darwin')
  {
    app.quit()
  }
})

//OS X Behavior
app.on('activate', function () {
  if (mainWindow === null)
  {
    createWindow()
  }
})
