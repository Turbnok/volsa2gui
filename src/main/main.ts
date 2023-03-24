import {app, BrowserWindow, dialog,shell, ipcMain, session} from 'electron';
import {join } from 'path'


function execShellCommand(cmd):Promise<string> {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
   exec(cmd, (error, stdout, stderr) => {
    if (error) {
      reject(error);  
      console.warn(error);
    }
    resolve(stdout? stdout : stderr);
   });
  });
 }
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    icon: join(__dirname, 'static/icon.png'),
    autoHideMenuBar: true,
    darkTheme:true,
    
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      devTools: true,//process.env.NODE_ENV ==='development'
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
    //mainWindow.loadURL(`http://www.ladydinde.com`);
    console.log("hop?" )
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
   // Make all links open with the browser, not with the application
   mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    console.log("URL ...", url)
      if (url.startsWith('https:')) shell.openExternal(url)
        return { action: 'deny' }
    })

}

app.whenReady().then(() => {
  createWindow();
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});
ipcMain.on('openURL', (event, url) => {
  console.log(url);
  require('electron').shell.openExternal(url);
})
ipcMain.handle('ls', async () => {
  return await execShellCommand("ls").then((list:string)=>{
    return list.split("\n");
  }).catch((error)=>{
    return 
  }); 
})
ipcMain.handle('debuge', async () => {
  console.log(app.getPath('home'))
  //return await execShellCommand(join(app.getPath('home'),'/.cargo/bin/volsa2-cli')); 
})
ipcMain.handle('checkvolsa', async () => {  
  return await execShellCommand(`command -v ${join(app.getPath('home'),'/.cargo/bin/volsa2-cli')}`).then((list:string)=>{
     return true
  }).catch((error)=>false); 
})
ipcMain.handle('list', async () => {
  console.log("List ?")  
  return await execShellCommand(`${join(app.getPath('home'),'/.cargo/bin/volsa2-cli')} list`).then((list:string)=>{
    console.log("la ???")
    const samples:Array<string> = list.split("\n");
    samples.pop()
    return samples;
  }).catch((error)=>{
    console.log("Error")
    return "no volca"
  }); 
})