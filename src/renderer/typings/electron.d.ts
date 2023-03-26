/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  sendMessage: (message: string) => void,
  openURL: (url: string) => void,
  dialog:()=>void
}
export interface Sound {
  id: number;
  text: string;
  length:number;
  level:string;
  speed:number;
  file:string|null;
  changed:boolean;
  sync:boolean;
  fileNew:string|null;
  textNew:string|null;
}
 
/** FS as FileSystem */
export interface Fs {
  ls: () => Array<string>,
  checkvolsa: ()=>boolean,
  debuge: ()=>string
  play: (file:string)=>string
}
export interface Volsa {
  list: () => {space:number,samples:Array<{id:number;name:string;length:number;speed:number}>}|string,     
  download: (id:number) => string,  
  upload:(id:number,path:string) => string,     
  remove: (id:number) => string,     
}


declare global {
  interface Window {
    electronAPI: ElectronApi,
    fs:Fs,
    volsa:Volsa
  }
}
