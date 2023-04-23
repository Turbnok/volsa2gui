import { app, BrowserWindow, dialog, shell, ipcMain, session } from "electron"
import { join } from "path"
import * as child from "child_process"
import os from "os"
import { getStore, setStore } from "./Store"
import { Config } from "../renderer/typings/electron"
let workingDir = os.homedir()
let mainWindow

function execShellCommand(cmd): Promise<string> {
  return new Promise((resolve, reject) => {
    child.exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        console.warn(error)
      }
      resolve(stdout ? stdout : stderr)
    })
  })
}
async function createWindow() {
  const store = await getStore("config")
  //const toreS = await setStore("config", { directory: "/hop", volsa2cli: "/sdf/" })
  mainWindow = new BrowserWindow({
    width: 800,
    height: 900,
    minWidth: 600,
    minHeight: 400,
    icon: join(__dirname, "static/icon.png"),
    autoHideMenuBar: true,
    darkTheme: true,
    backgroundColor: "#2e3440",
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      devTools: process.env.NODE_ENV === "development",
    },
  })

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2]
    mainWindow.loadURL(`http://localhost:${rendererPort}`)
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"))
  }

  // Make all links open with the browser, not with the application
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url)
    return { action: "deny" }
  })
}

app.whenReady().then(() => {
  createWindow()
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["script-src 'self'"],
      },
    })
  })

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit()
})
ipcMain.on("openURL", (event, url) => {
  shell.openExternal(url)
})
console.log("HOPHOPHPO")
ipcMain.handle("dialog", async (e, file: boolean) => {
  /**
   * there is a bug about dialog box appearing beahind mainwindow
   * https://github.com/electron/electron/issues/10723
   * it seems related to "gnome notify"
   */
  const savePath = await dialog.showOpenDialog(mainWindow, {
    title: file ? "Select volsa2-cli binary" : "Select a working directory",
    buttonLabel: "Select",
    properties: file ? [] : ["openDirectory"],
  })
  if (savePath.canceled) return
  workingDir = savePath.filePaths[0]

  return workingDir
})
ipcMain.handle("ls", async () => {
  return await execShellCommand("ls")
    .then((list: string) => {
      return list.split("\n")
    })
    .catch(() => null)
})
ipcMain.handle("debuge", async () => {
  console.log(app.getPath("home"))
})
ipcMain.handle("checkvolsa", async () => {
  return await execShellCommand(`command -v ${join(app.getPath("home"), "/.cargo/bin/volsa2-cli")}`)
    .then(() => true)
    .catch(() => false)
})
ipcMain.handle("list", async () => {
  return await execShellCommand(`${join(app.getPath("home"), "/.cargo/bin/volsa2-cli")} list -a`)
    .then((list: string) => {
      const samples: Array<string> = list.split("\n")
      samples.shift()
      const spa = samples.shift()?.match(/(?<=Occupied space: )(.*)(?=%)/)
      const space = spa ? spa[1] : 0
      samples.pop()

      return {
        space,
        samples: samples.map((item) => {
          let r: Array<string> | null = item.match(/^(.+?): (.+?) - length: (.+?), speed: (.+?), level: (.+)/)
          if (r) {
            const s = Math.floor((Number(r[3].trim()) / 31250) * 100) / 100
            return {
              id: r[1].trim(),
              name: r[2].trim(),
              length: s,
              speed: r[4].trim(),
              level: r[5].trim(),
            }
          }
          r = item.match(/^(.+?):/)
          if (r) {
            return { id: r[1].trim(), name: "", length: 0, speed: 0, level: 0 }
          }
        }),
      }
    })
    .catch(() => {
      return "no volca"
    })
})

ipcMain.handle("erase", async (e, id: number) => {
  return await execShellCommand(join(app.getPath("home"), `/.cargo/bin/volsa2-cli remove ${id}`))
    .then(() => "ok")
    .catch(() => "no volca")
})

ipcMain.handle("play", async (e, file: string) => {
  return await execShellCommand(`aplay "${file}"`).then(() => "ok")
})
ipcMain.handle("download", async (e, id: number) => {
  const cli = join(app.getPath("home"), `/.cargo/bin/volsa2-cli`)
  const cmd = `cd ${workingDir} && ${cli} download ${id}`
  return await execShellCommand(cmd)
    .then((result: string) => {
      const lines = result.split("\n")
      return lines[2].split('"')[1]
    })
    .catch(() => "no volca")
})
ipcMain.handle("upload", async (e, id: number, path: string) => {
  return await execShellCommand(join(app.getPath("home"), `/.cargo/bin/volsa2-cli upload "${path}" ${id}`))
    .then((result: string) => {
      const lines = result.split("\n")
      return lines[2].split('"')[1]
    })
    .catch(() => {
      return "no volca"
    })
})

ipcMain.handle("getConfig", async (e, configName: string): Promise<Config> => {
  const store = await getStore(configName)
  return store
})

ipcMain.handle("setConfig", async (e, configName: string, config: Config) => {
  console.log("SET CONFIG ?", config)
  return await setStore(configName, config)
})
