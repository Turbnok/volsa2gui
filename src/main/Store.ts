import { app } from "electron"
import { Config } from "../renderer/typings/electron"
import { readFile, writeFile } from "fs/promises"
import { join } from "path"

export async function getStore(storeName: string): Promise<Config> {
  console.log("GET STORE")
  const userDataPath = app.getPath("userData")
  const path = join(userDataPath, storeName + ".json")
  //const e: Config = await parseDataFile(path, { directory: app.getPath("home"), soundSettings: "mid", volsa2cli: join(app.getPath("home"), ".cargo", "bin", "volsa2cli") })
  // console.log("eeeee", e.directory)
  return await parseDataFile(path, { directory: app.getPath("home"), soundSettings: "mid", volsa2cli: join(app.getPath("home"), ".cargo", "bin", "volsa2cli") })
}

export async function setStore(storeName: string, json: Config) {
  const userDataPath = app.getPath("userData")
  const path = join(userDataPath, storeName + ".json")
  return await writeFile(path, JSON.stringify(json))
}

export async function updateStoreValue(storeName: string, key: string, value: string) {
  const store = await getStore(storeName)
  store[key] = value
  return setStore(storeName, store)
}
async function parseDataFile(filePath: string, defaults: Config): Promise<Config> {
  try {
    const file = await readFile(filePath, "utf8")

    return JSON.parse(file) as Config
  } catch (error) {
    console.log("DEFAULT")
    // if there was some kind of error, return the passed in defaults instead.
    return defaults
  }
}
