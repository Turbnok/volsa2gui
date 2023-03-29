import { ref } from "vue"
import { defineStore } from "pinia"
import { Sound } from "../typings/electron"
import { isString } from "@vue/shared"
import { Popin, useAppStore } from "./appStore"

export const useSamplesStore = defineStore("samplesStore", () => {
  const appStore = useAppStore()
  const emptySound = (pId: number) => {
    return {
      id: pId,
      processing: false,
      text: "",
      length: 0,
      level: 0,
      speed: 0,
      size: 0,
      file: null,
      textNew: null,
      fileNew: null,
      changed: false,
      sync: false,
    }
  }
  // create 200 empty sounds
  const a = Array(200)
    .fill(emptySound(0))
    .map((a, i) => emptySound(i + 1))
  const samples = ref<Array<Sound>>(a)
  // space left on device
  const space = ref(0)

  /**
   * get volca samples list
   */
  const getSamples = async () => {
    const list = await window.volsa.list()
    console.log("list", list)
    if (list === "no volca") {
      appStore.showPopin(Popin.Error, "Error: could not find volca sample. Is it plugged ?")
    } else {
      if (!isString(list)) {
        space.value = list.space
        list.samples.forEach((v) => {
          samples.value[v.id - 1] = {
            id: v.id,
            processing: false,
            text: v.name,
            length: v.length,
            speed: v.speed,
            size: 0,
            textNew: null,
            fileNew: null,
            changed: false,
            file: null,
            sync: true,
            level: 0,
          }
        })
      }
    }
  }
  /**
   * update
   */
  const update = async (id: number, name: string, path: string) => {
    const sound = samples.value[id - 1]
    sound.textNew = name
    sound.fileNew = path
    sound.changed = true
  }
  /**
   * upload a sound from desktop to volca
   * @param id the sample id
   * @param path the sample path
   */
  const upload = async (id: number, path: string | null) => {
    if (!path) return
    const sound = samples.value[id - 1]
    sound.processing = true
    const result = await window.volsa.upload(id, path)
    if (result === "no volca") {
      appStore.showPopin(Popin.Error, "Error: could not find volca sample. Is it plugged ?")
    } else {
      sound.text = sound.textNew ?? ""
      sound.changed = false
      sound.file = sound.fileNew ?? ""
      sound.fileNew = null
      sound.textNew = null
    }
  }

  /**
   * download a sound from volca to working directory
   * @param id the sample id
   */
  const download = async (id: number) => {
    const sound = samples.value[id - 1]
    sound.processing = true
    const result = await window.volsa.download(id)
    if (result === "no volca") {
      // error
    } else {
      sound.file = result
      sound.processing = false
    }
  }
  /**
   * revert state for sample id
   * @param id
   */
  const revert = async (id: number) => {
    const sound = samples.value[id - 1]
    sound.fileNew = sound.textNew = null
    sound.changed = false
  }
  /**
   * remove a volca sample
   * @param id the sample id
   */
  const erase = async (id: number) => {
    const sound = samples.value[id - 1]
    sound.processing = true
    const result = await window.volsa.erase(id)

    if (result === "no volca") {
      appStore.showPopin(Popin.Error, "Error: could not find volca sample. Is it plugged ?")
    } else {
      sound.processing = false
      samples.value[id - 1] = emptySound(id)
    }
  }
  return { space, samples, getSamples, revert, erase, download, upload, update }
})
