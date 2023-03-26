import {app, BrowserWindow, dialog,shell, ipcMain, session} from 'electron';
import {join } from 'path'
//import Audic from 'audic';




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
    height: 900,
    minWidth: 600,
    minHeight: 400,
    icon: join(__dirname, 'static/icon.png'),
    autoHideMenuBar: true,
    darkTheme:true,
    backgroundColor: "#2e3440",
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
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }

   // Make all links open with the browser, not with the application
   mainWindow.webContents.setWindowOpenHandler(({ url }) => {
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
  return await execShellCommand(`${join(app.getPath('home'),'/.cargo/bin/volsa2-cli')} list -a`).then((list:string)=>{
    const samples:Array<string> = list.split("\n");
    const infos = samples.shift();
    const spa = samples.shift()?.match(/(?<=Occupied space: )(.*)(?=%)/);
    const space = spa ? spa[1] : 0;
    
    samples.pop()
    
    return {space,samples:samples.map(item=>{
      let r:Array<string>|null = item.match(/^(.+?): (.+?) - length: (.+?), speed: (.+?), level: (.+)/);
      
    if(r){
      return {id:r[1].trim(),name:r[2].trim(),length:r[3].trim(),speed:r[4].trim(), level:r[5].trim()}
    }
    r = item.match(/^(.+?):/);
    if(r){
    return {id:r[1].trim(),name:"",length:0,speed:0, level:0}
    }
    })};
  }).catch((error)=>{
    console.log("Error")
    return "no volca"
  }); 
})

ipcMain.handle('remove', async (e,id:number) => {
  return await execShellCommand(join(app.getPath('home'),`/.cargo/bin/volsa2-cli remove ${id}`)).then((result:string)=>{
    return "ok"
  }).catch((error)=>{
    console.log("Error")
    return "no volca"
  }); 
})

ipcMain.handle('play', async (e,file:string) => {
  return await execShellCommand(`aplay "${file}"`).then((result:string)=>{
    return "ok";
  })
 // const audic = new Audic(file);
 // await audic.play();
})
ipcMain.handle('download', async (e,id:number) => {
  return await execShellCommand(join(app.getPath('home'),`/.cargo/bin/volsa2-cli download ${id}`)).then((result:string)=>{
    const lines = result.split('\n');
    return lines[2].split('"')[1];
  }).catch((error)=>{
    console.log("Error")
    return "no volca"
  }); 
})
ipcMain.handle('upload', async (e,id:number, path:string) => {
  console.log("upload, ", id, path);
  return await execShellCommand(join(app.getPath('home'),`/.cargo/bin/volsa2-cli upload "${path}" ${id}`)).then((result:string)=>{
    const lines = result.split('\n');
    return lines[2].split('"')[1];
  }).catch((error)=>{
    console.log("Error")
    return "no volca"
  }); 
})