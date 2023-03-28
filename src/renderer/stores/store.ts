import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { Sound } from "../typings/electron"

export const useListStore = defineStore("samplesList", () => {
  const list = ref<Array<Sound>>()
  const name = ref("space")
  const doubleCount = computed(() => 2)
  function increment() {

  }

  return { list, name, doubleCount, increment }
})
