import { contextBridge, ipcRenderer } from "electron"
contextBridge.exposeInMainWorld("electronAPI", {
  openURL: (url: string) => ipcRenderer.send("openURL", url),
  sendMessage: (message: string) => ipcRenderer.send("message", message),
})
contextBridge.exposeInMainWorld("fs", {
  ls: async () => await ipcRenderer.invoke("ls"),
  checkvolsa: async () => await ipcRenderer.invoke("checkvolsa"),
  debuge: async () => await ipcRenderer.invoke("debuge"),
  play: async (file: string) => await ipcRenderer.invoke("play", file),
  dialog: (file = false) => ipcRenderer.invoke("dialog", file),
  getConfig: async (configName: string) => await ipcRenderer.invoke("getConfig", configName),
  setConfig: async (configName: string, config: string) => await ipcRenderer.invoke("setConfig", configName, config),
})
contextBridge.exposeInMainWorld("volsa", {
  list: async () => await ipcRenderer.invoke("list"),
  download: async (id: number) => await ipcRenderer.invoke("download", id),
  upload: async (id: number, path: string) => await ipcRenderer.invoke("upload", id, path),
  erase: async (id: number) => await ipcRenderer.invoke("erase", id),
})
