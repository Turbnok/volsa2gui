<script setup lang="ts">
import { ref, computed, watch } from "vue";
console.log("lapo");
const props = defineProps(["msg", "type"]);
// type-based
const emit = defineEmits<{
  (e: "close"): void;
}>();
async function check() {
  volsa.value = await window.fs.checkvolsa();
}
function onVolsa(e: any) {
  e.preventDefault();
  window.electronAPI.openURL("https://github.com/00nktk/volsa2");
}
const volsa = ref(true);
const msg = ref("");
const type = ref("error");
function close() {
  emit("close");
  msg.value = "";
}
watch(
  () => props.msg,
  (pMsg) => {
    msg.value = pMsg;
  }
);
watch(
  () => props.type,
  (pType) => {
    type.value = pType;
  }
);
check();
</script>

<template>
  <div @click="close" class="container" v-if="!volsa || msg.length">
    <div :class="type" v-if="msg.length && type != 'infos'">{{ msg }}</div>
    <div :class="type" v-if="type == 'infos'">
      <h2><img class="sample2" src="/volca2.svg" alt="Sample2" />Volsa2 gui</h2>
      <h3>
        a gui for VolSa 2 by
        <a href="https://github.com/00nktk/volsa2" target="_blank"
          >Nikita/00nkt</a
        >
      </h3>
      <h4></h4>
      <div>
        <p>This project is based on :</p>
        <ul>
          <li>
            <a href="https://github.com/00nktk/volsa2" target="_blank"
              >VolSa 2</a
            ><br />Volsa 2 is a simple command line sample manager for KORG
            Volca Sample 2 that works over ALSA MIDI sequencer. It can list,
            upload, download and remove samples via USB.
          </li>
          <li>
            <a href="https://www.electronjs.org/" target="_blank">electronjs</a
            ><br />Build cross-platform desktop apps with JavaScript, HTML, and
            CSS
          </li>
          <li>
            <a
              href="https://github.com/Deluze/electron-vue-template.git"
              target="_blank"
              >electron-vue-template</a
            ><br />A simple starter template for a Vue3 + Electron TypeScript
            based application, including ViteJS and Electron Builder
          </li>
          <li>
            <a href="https://www.nordtheme.com/" target="_blank">nordtheme</a
            ><br />An arctic, north-bluish color palette.
          </li>
        </ul>
      </div>
    </div>
    <div :class="type" v-if="!volsa">
      Error : volsa2-cli is not installed or not in
      `/home/$USER/.cargo/bin/volsa2-cli`, please check
      <a @click="onVolsa">https://github.com/00nktk/volsa2</a> README.md
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
