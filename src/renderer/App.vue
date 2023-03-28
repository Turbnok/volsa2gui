<script setup lang="ts">
import { ref } from "vue"

import { storeToRefs } from "pinia"
import Menu from "./components/Menu.vue"
import List from "./components/List.vue"
import Erro from "./components/Error.vue"

import { useSamplesStore } from "./stores/samplesStore"
const store = useSamplesStore()
const { samples } = storeToRefs(store)

const msg = ref("")
const type = ref("error")

function close() {
  msg.value = ""
  type.value = "error"
}
function help() {
  msg.value = "help"
  type.value = "infos"
}

// async function sendAll() {
//   const newUploads = list.value.reduce((acc: Array<Sound>, val: Sound) => {
//     if (val.changed) {
//       acc.push(val)
//     }
//     return acc
//   }, [])
//   console.log(newUploads)
// }
function error(message: string) {
  msg.value = message
}
</script>
<template>
  <Menu @help="help" @error="error" />
  <List :list="samples" @error="error" />
  <Erro @close="close" :msg="msg" :type="type" />
</template>
<style></style>
