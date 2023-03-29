import { ref } from "vue"
import { defineStore } from "pinia"
export enum Popin {
  Error,
  Message,
  Credits,
  NoVolsa,
}
export const useAppStore = defineStore("appStore", () => {
  const show = ref(false)
  const message = ref<string | null>()
  const type = ref<Popin>(Popin.Error)
  const directory = "/"
  const close = () => {
    show.value = false
    message.value = ""
  }
  const showPopin = (pType: Popin, msg: string | null) => {
    console.log("SHOW POPIN", pType)
    show.value = true
    type.value = pType
    message.value = msg
  }
  return { show, message, directory, type, close, showPopin }
})
