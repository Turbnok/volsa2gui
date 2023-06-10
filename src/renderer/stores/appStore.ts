import { ref, isProxy, toRaw } from "vue"
import { defineStore } from "pinia"
import { Config } from "../typings/electron"
export enum Popin {
  Error,
  Message,
  Credits,
  NoVolsa,
}
export const useAppStore = defineStore("appStore", () => {
  const config = ref<Config>({ directory: "", soundSettings: "mid", volsa2cli: "" })

  const show = ref(false)
  const message = ref<string | null>()
  const type = ref<Popin>(Popin.Error)

  const close = () => {
    show.value = false
    message.value = ""
  }
  const showPopin = (pType: Popin, msg: string | null) => {
    show.value = true
    type.value = pType
    message.value = msg
  }
  const getSettings = async () => {
    config.value = await window.fs.getConfig("config")
  }
  const setSettingsValue = async (setting: keyof Config, value: string) => {
    const raw = JSON.parse(JSON.stringify(config.value))
    raw[setting] = value
    config.value[setting] = value
    await window.fs.setConfig("config", raw)
  }
  getSettings()
  return { config, show, message, type, close, showPopin, setSettingsValue }
})
