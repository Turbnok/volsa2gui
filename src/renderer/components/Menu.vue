<script setup lang="ts">
import { storeToRefs } from "pinia"
import { ref } from "vue"
import { useSamplesStore } from "../stores/samplesStore"
const directory = ref("/")
const store = useSamplesStore()
const { space } = storeToRefs(store)

const props = defineProps(["directory"])
const emit = defineEmits<{
  (e: "error", message: string): void
  (e: "directory", path: string): void
  (e: "help"): void
}>()
async function chooseFolder() {
  const d = await window.fs.dialog()
  if (d) {
    directory.value = d
  }
}

async function help() {
  emit("help")
}
</script>
<template>
  <div class="header">
    <img class="sample2" src="/volca2.svg" alt="Sample2" />
    <h2 class="title">Volsa2 gui</h2>
    <div class="help">
      <button @click="help">?</button>
    </div>
    <div class="occupied">
      <label for="space">space:</label>
      <meter class="progress" id="space" low="70" high="85" :value="space" min="0" max="100" />
    </div>
  </div>

  <div class="menu">
    <div class="left">
      <button type="button" @click="chooseFolder">📂</button>
      <div class="folder">
        <span>Working folder</span>
        <span>{{ directory }}</span>
      </div>
      <!-- <button type="button" @click="listDirs">send</button> -->
    </div>
    <div class="right">
      <!--<button type="button" @click="sendAll">📨 send</button>-->
      <button type="button" @click="store.getSamples()">📃 list</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.progress {
  border: none;
  height: 30px;
  margin-left: 0.5rem;
  border-radius: 5px;
  &::-webkit-meter-bar {
    border: none;
    background: var(--nord3);
  }
  &::-webkit-meter-optimum-value {
    background: var(--nord14);
    border-radius: 5px;
  }
  &::-webkit-meter-suboptimum-value {
    background: var(--nord12);
    border-radius: 5px;
  }
  &::-webkit-meter-even-less-good-value {
    border-radius: 5px;
    background: var(--nord11);
  }
}

.occupied {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.8rem;
}

.folder {
  display: flex;
  flex-direction: column;
}
.help {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  flex: 1;
  button {
    display: flex;
    padding: 0;
    height: 20px;
    width: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
  }
}
.header {
  padding: 0rem 1rem;
  display: flex;
  flex-direction: row;
}
.sample2 {
  width: 75px;
}
h2 {
  padding: 0rem 1rem;
}
.menu {
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  align-items: flex-end;
}
.left {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  span {
    color: var(--nord9);
    font-size: 0.8rem;
  }
}
.right {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
}
button {
  margin-right: 0.5rem;
}
button:last-child {
  margin-right: 0rem;
}
</style>
