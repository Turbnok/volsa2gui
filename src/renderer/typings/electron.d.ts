/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  sendMessage: (message: string) => void,
  dialog:()=>void
}
export interface Fs {
  ls: () => String,
}

declare global {
  interface Window {
    electronAPI: ElectronApi,
    fs:Fs
  }
}
