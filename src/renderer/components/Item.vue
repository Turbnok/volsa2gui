<script setup lang="ts">
import { Sound } from "../typings/electron"
import { useSamplesStore } from "../stores/samplesStore"
const store = useSamplesStore()

interface Props {
  sound: Sound
}
const props = defineProps<Props>()

function play() {
  const sound = props.sound.fileNew ? props.sound.fileNew : props.sound.file
  if (sound) window.fs.play(sound)
}
</script>
<template>
  <div class="row">
    <div class="name">
      <span class="number">{{ props.sound.id.toString().padStart(3, "0") }}</span>
      : {{ props.sound.changed ? "✨" : "" }}{{ props.sound.textNew ? props.sound.textNew : props.sound.text
      }}<span :class="props.sound.changed ? 'file new' : 'file'" v-if="props.sound.file || props.sound.fileNew"> ({{ props.sound.fileNew ?? props.sound.file }})</span>
    </div>
    <div v-if="props.sound.processing" class="loader">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" />
      </svg>
    </div>
    <div class="actions">
      <button :disabled="!props.sound.file && !props.sound.fileNew" @click="play">♪</button>
      <button :disabled="!props.sound.text || !props.sound.sync || props.sound.file || props.sound.fileNew" @click="store.download(props.sound.id)">↧</button>
      <button :disabled="!props.sound.fileNew" @click="store.upload(props.sound.id, props.sound.fileNew)">↥</button>
      <button :disabled="!props.sound.changed" @click="store.revert(props.sound.id)">⟲</button>
      <button :disabled="!props.sound.sync || !props.sound.text" @click="store.erase(props.sound.id)">⨯</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes progress {
  from {
    stroke-dashoffset: 200%;
  }
  to {
    stroke-dashoffset: 0%;
  }
}
.loader {
  display: flex;
  align-items: center;
  width: 20px;
  rect {
    stroke: #bf616a;
    stroke-width: 4px;
    stroke-dasharray: 100%;
    fill: none;
  }
  animation: progress 0.5s linear infinite;
}

button {
  margin-left: 0.2rem;
  padding: 0.2rem 0.4rem;
  width: 2rem;
  vertical-align: middle;
}
.name {
  color: var(--nord4);
  flex: 1;
}
.actions {
  justify-self: flex-end;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.number {
  color: #bf616a;
  font-family: "Courier New", Courier, monospace;
}
.row {
  height: 43px;
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  text-align: left;
  color: #888;
  padding: 0.5rem;
  list-style: none;
  background-color: var(--nord1);
  border-left: 3px solid var(--nord1);
  &:hover {
    border-left: 3px solid var(--nord8);
    //margin-left: 5px;
  }
  &:nth-child(2n) {
    background-color: var(--nord2);
  }
}
.file {
  font-size: 0.8rem;
  color: var(--nord9);
  &.new {
    color: var(--nord13);
  }
}
.row:last-child {
  border-bottom: 0px;
}
</style>
