<script setup lang="ts">
import { ref } from "vue"
import { Sound } from "./typings/electron"
import Menu from "./components/Menu.vue"
import List from "./components/List.vue"
import Erro from "./components/Error.vue"
import { isString } from "@vue/shared"
const list = ref()
list.value = Array(200)
  .fill(emptySound(0))
  .map((a, i) => emptySound(i + 1))
const percent = ref(0)
const msg = ref("")
const type = ref("error")
const directory = ref("/")
function emptySound(pId: number) {
  return {
    id: pId,
    text: "",
    length: 0,
    level: 0,
    speed: 0,
    file: null,
    textNew: null,
    fileNew: null,
    changed: false,
  }
}
function close() {
  msg.value = ""
  type.value = "error"
}
function help() {
  msg.value = "help"
  type.value = "infos"
}
function onDirectory(path: string) {
  directory.value = path
}
async function sendAll() {
  const newUploads = list.value.reduce((acc: Array<Sound>, val: Sound) => {
    if (val.changed) {
      acc.push(val)
    }
    return acc
  }, [])
  console.log(newUploads)
}
function refreshList(
  pList:
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
) {
  if (isString(pList)) {
    return
  } else {
    percent.value = pList.space
    pList.samples.forEach((v, i) => {
      list.value[v.id - 1] = {
        id: v.id,
        text: v.name,
        length: v.length,
        speed: v.speed,
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
function error(message: string) {
  msg.value = message
}
</script>
<template>
  <Menu :percent="percent" :directory="directory" @help="help" @sendAll="sendAll" @refresh_list="refreshList" @error="error" @directory="onDirectory" />
  <List :list="list" @error="error" />
  <Erro @close="close" :msg="msg" :type="type" />
</template>
<style></style>
