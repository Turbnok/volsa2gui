import { ref } from "vue"
import { defineStore } from "pinia"
import { Config } from "../typings/electron"
export enum Popin {
  Error,
  Message,
  Credits,
  NoVolsa,
}
export const useAppStore = defineStore("appStore", () => {
  const settings = ref(false)
  const config = ref<Config>()

  const show = ref(false)
  const message = ref<string | null>()
  const type = ref<Popin>(Popin.Error)
  const directory = ref("/")
  const close = () => {
    show.value = false
    message.value = ""
  }
  const showPopin = (pType: Popin, msg: string | null) => {
    show.value = true
    type.value = pType
    message.value = msg
  }
  const showSettings = () => {
    settings.value = true
  }

  const hideSettings = () => {
    settings.value = false
  }
  const getSettings = async () => {
    config.value = await window.fs.getConfig("config")
  }
  getSettings()

  return { config, settings, show, message, directory, type, close, showPopin, showSettings, hideSettings }
})
