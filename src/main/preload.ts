import {contextBridge, ipcRenderer,dialog} from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openURL: (url:string) => ipcRenderer.send('openURL', url),
  sendMessage: (message:string) => ipcRenderer.send('message', message),
  
})
contextBridge.exposeInMainWorld('fs', {
  ls: async () => await ipcRenderer.invoke('ls'),     
  checkvolsa: async () => await ipcRenderer.invoke('checkvolsa'),   
  debuge: async () => await ipcRenderer.invoke('debuge'),
  play: async (file:string) => await ipcRenderer.invoke('play',file),
  dialog:()=> ipcRenderer.invoke('dialog'),
})
contextBridge.exposeInMainWorld('volsa', {
  list: async () => await ipcRenderer.invoke('list'),     
  download: async (id:number) => await ipcRenderer.invoke('download',id),     
  upload: async (id:number, path:string) => await ipcRenderer.invoke('upload',id,path),        
  remove: async (id:number) => await ipcRenderer.invoke('remove',id),     
})
