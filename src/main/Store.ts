import { app } from "electron"

import { readFile, writeFile } from "fs/promises"
import { join } from "path"

export async function getStore(storeName: string) {
  const userDataPath = app.getPath("userData")
  const path = join(userDataPath, storeName + ".json")
  return await parseDataFile(path, { directory: app.getPath("home"), volsa2cli: join(app.getPath("home"), ".cargo", "bin", "volsa2cli") })
}

export async function setStore(storeName: string, json: { directory: string; volsa2cli: string }) {
  const userDataPath = app.getPath("userData")
  const path = join(userDataPath, storeName + ".json")
  return await writeFile(path, JSON.stringify(json))
}

export async function updateStoreValue(storeName: string, key: string, value: string) {
  const store = await getStore(storeName)
  store[key] = value
  return setStore(storeName, store)
}
async function parseDataFile(filePath, defaults) {
  try {
    const file = await readFile(filePath, "utf8")
    return JSON.parse(file)
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults
  }
}
