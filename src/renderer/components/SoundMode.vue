<script setup lang="ts">
import { storeToRefs } from "pinia"
import { ref } from "vue"
import { useAppStore } from "../stores/appStore"

const appStore = useAppStore()
const { config } = storeToRefs(appStore)
const pick = ref(config.value.soundSettings)
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
