import {contextBridge, ipcRenderer,dialog} from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message:string) => ipcRenderer.send('message', message),
  dialog:()=> ipcRenderer.send('dialog'),
})
contextBridge.exposeInMainWorld('fs', {
  ls: async () => {
    const hop = await ipcRenderer.invoke('ls') 
    return hop;
  }
})