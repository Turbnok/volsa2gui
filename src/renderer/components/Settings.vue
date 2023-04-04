<script setup lang="ts">
import { storeToRefs } from "pinia"
import { Popin } from "../stores/appStore"
import { useSamplesStore } from "../stores/samplesStore"
import { useAppStore } from "../stores/appStore"

const store = useSamplesStore()
const { space } = storeToRefs(store)
const appStore = useAppStore()
const { directory } = storeToRefs(appStore)

async function chooseFolder() {
  const d = await window.fs.dialog()
  if (d) {
    directory.value = d
  }
}
</script>
<template>
  <div class="settings" v-if="appStore.settings">
    Settings !
    <button @click="appStore.hideSettings()">⨯</button>
    <div>
      <label for="volsa2cli">Path to volsa2cli</label>
      <input :value="appStore.config?.volsa2cli" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--nord1);
}
</style>
