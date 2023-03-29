<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useAppStore, Popin } from "../stores/appStore"

const appStore = useAppStore()
const { show, message, type } = storeToRefs(appStore)
</script>

<template>
  <div @click="appStore.close()" class="container" v-if="show">
    <div class="infos" v-if="type === Popin.Credits">
      <h2><img class="sample2" src="/volca2.svg" alt="Sample2" />Volsa2 gui</h2>
      <h3>
        a gui for VolSa 2 by
        <a href="https://github.com/00nktk/volsa2" target="_blank">Nikita/00nkt</a>
      </h3>
      <h4></h4>
      <div>
        <p>This project is based on :</p>
        <ul>
          <li>
            <a href="https://github.com/00nktk/volsa2" target="_blank">VolSa 2</a><br />Volsa 2 is a simple command line sample manager for KORG Volca Sample 2 that works over ALSA MIDI sequencer. It
            can list, upload, download and remove samples via USB.
          </li>
          <li><a href="https://www.electronjs.org/" target="_blank">electronjs</a><br />Build cross-platform desktop apps with JavaScript, HTML, and CSS</li>
          <li>
            <a href="https://github.com/Deluze/electron-vue-template.git" target="_blank">electron-vue-template</a><br />A simple starter template for a Vue3 + Electron TypeScript based application,
            including ViteJS and Electron Builder
          </li>
          <li>
            <a href="https://github.com/Deluze/electron-vue-template.git" target="_blank">🍍Pinia</a><br />The intuitive store for Vue.js Type Safe, Extensible, and Modular by design. Forget you are
            even using a store.
          </li>
          <li><a href="https://www.nordtheme.com/" target="_blank">nordtheme</a><br />An arctic, north-bluish color palette.</li>
        </ul>
      </div>
    </div>
    <div class="infos" v-else-if="type === Popin.Message">{{ message }}</div>
    <div class="error" v-else-if="type === Popin.Error">{{ message }}</div>
    <div class="error" v-if="type === Popin.NoVolsa">
      Error : volsa2-cli is not installed or not in `/home/$USER/.cargo/bin/volsa2-cli`, please check
      <a href="https://github.com/00nktk/volsa2" target="_blank">https://github.com/00nktk/volsa2</a> README.md
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  margin: 0;
  img {
    margin-right: 1rem;
  }
}
.sample2 {
  width: 8rem;
}
.container {
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.infos {
  max-width: 800px;
  margin: 1rem;
  padding: 3rem;
  border: 1px solid var(--nord8);
  background-color: var(--nord3);
  border-radius: 0.5rem;
  a {
    color: var(--nord8);
  }
}
.error {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid var(--nord12);
  background-color: rgb(191, 97, 106, 0.3);
  border-radius: 0.5rem;
  a {
    color: #bf616a;
  }
}
.container a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
