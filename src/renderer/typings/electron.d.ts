/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  sendMessage: (message: string) => void,
  openURL: (url: string) => void,
  dialog:()=>void
}
/** FS as FileSystem */
export interface Fs {
  ls: () => Array<string>,
  checkvolsa: ()=>boolean,
  debuge: ()=>string
}
export interface Volsa {
  list: () => {space:number,samples:Array<{id:number;name:string;length:number;speed:number}>}|string,     
  download: () => Array<string>,    
  upload:() => Array<string>,     
  remove: () => Array<string>,     
}


declare global {
  interface Window {
    electronAPI: ElectronApi,
    fs:Fs,
    volsa:Volsa
  }
}
