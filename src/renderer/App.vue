<script setup lang="ts">
import Menu from "./components/Menu.vue"
import List from "./components/List.vue"
import Erro from "./components/Error.vue"
import Settings from "./components/Settings.vue"
import { version } from "../../package.json"
</script>
<template>
  <Menu />
  <List />
  <Erro />
  <Settings />
  <div class="version">v{{ version }}</div>
</template>
<style>
.version {
  color: var(--nord3);
  font-size: 0.6rem;
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
