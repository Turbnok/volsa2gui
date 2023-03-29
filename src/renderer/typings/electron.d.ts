/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  sendMessage: (message: string) => void
  openURL: (url: string) => void
  dialog: () => void
}
export interface Sound {
  id: number
  processing: boolean
  text: string
  length: number
  level: number
  speed: number
  size: number
  file: string | null
  changed: boolean
  sync: boolean
  fileNew: string | null
  textNew: string | null
}

/** FS as FileSystem */
export interface Fs {
  play: (file: string) => string
  dialog: () => string
}
export interface Volsa {
  list: () => Promise<
    | {
        space: number
        samples: Array<{
          id: number
          name: string
          length: number
          speed: number
        }>
      }
    | string
  >
  download: (id: number) => Promise<string>
  upload: (id: number, path: string) => Promise<string>
  erase: (id: number) => Promise<string>
}

declare global {
  interface Window {
    electronAPI: ElectronApi
    fs: Fs
    volsa: Volsa
  }
}
