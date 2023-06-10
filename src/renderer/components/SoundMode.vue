<script setup lang="ts">
import { storeToRefs } from "pinia"
import { ref, watch } from "vue"
import { useAppStore } from "../stores/appStore"
import { Config } from "../typings/electron"

const appStore = useAppStore()
const { config } = storeToRefs(appStore)
console.log("VALU : ", config.value.soundSettings)
const pick = ref(config.value.soundSettings)
watch(config, (newValue: Config) => {
  pick.value = newValue.soundSettings
})
watch(pick, (newValue: string) => {
  console.log("PICK ??", newValue)
  appStore.setSettingsValue("soundSettings", newValue)
})
</script>
<template>
  <div class="mode">
    <span>{{ config.soundSettings }}</span>
    <input type="radio" v-model="pick" value="left" />
    <input type="radio" v-model="pick" value="right" />
    <input type="radio" v-model="pick" value="mid" />
    <input type="radio" v-model="pick" value="side" />
  </div>
</template>

<style scoped lang="scss">
.mode {
  display: flex;
  align-items: center;
  color: var(--nord9);
  font-size: 0.8rem;
  input {
    margin: 0 0.1rem;
  }
}
</style>
