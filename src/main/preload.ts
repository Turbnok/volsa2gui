import {contextBridge, ipcRenderer,dialog} from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openURL: (url:string) => ipcRenderer.send('openURL', url),
  sendMessage: (message:string) => ipcRenderer.send('message', message),
  dialog:()=> ipcRenderer.send('dialog'),
})
contextBridge.exposeInMainWorld('fs', {
  ls: async () => await ipcRenderer.invoke('ls'),     
  checkvolsa: async () => await ipcRenderer.invoke('checkvolsa'),   
  debuge: async () => await ipcRenderer.invoke('debuge')
})
contextBridge.exposeInMainWorld('volsa', {
  list: async () => await ipcRenderer.invoke('list'),     
  download: async () => await ipcRenderer.invoke('dowload'),     
  upload: async () => await ipcRenderer.invoke('upload'),     
  remove: async () => await ipcRenderer.invoke('remove'),     
})
