<script setup lang="ts">
import { ref } from "vue"
import type { Ref } from "vue"
import Item from "./Item.vue"
import { useSamplesStore } from "../stores/samplesStore"

interface FileWithPath extends File {
  path: string
}
/**
 * @see https://stackoverflow.com/questions/55728316/file-object-does-not-have-a-path-property-typescript
 */
const sampleStore = useSamplesStore()

const $items: Ref<HTMLElement | null> = ref(null)
const $drop: Ref<HTMLElement | null> = ref(null)

const drop = ref(false)
const dropId = ref(0)
const dropzone = ref(false)
const offsetY = ref(0)

function onDragLeave(e: DragEvent) {
  e.preventDefault()
  drop.value = false
}

document.addEventListener("mouseleave", (e: MouseEvent) => {
  e.preventDefault()

  dropzone.value = true
})
document.addEventListener("mouseenter", (e: MouseEvent) => {
  e.preventDefault()

  dropzone.value = false
})
function onDragEnter(e: DragEvent) {
  e.preventDefault()
  drop.value = true
}
function onMove(e: DragEvent) {
  e.preventDefault()
  if ($items.value) {
    dropId.value = Math.floor((e.clientY - ($items.value.offsetTop - $items.value.scrollTop)) / 43)
    offsetY.value = dropId.value * 43
  }
  const nbItems = e.dataTransfer?.items?.length ?? 0
  if ($drop.value) {
    $drop.value.style.top = `${offsetY.value}px`
    $drop.value.style.height = `${nbItems * 43}px`
  }
}
function onDrop(e: DragEvent) {
  drop.value = false
  const files: FileList | undefined = e.dataTransfer?.files
  const nbItems = e.dataTransfer?.files.length ?? 0
  if ($items.value) {
    dropId.value = Math.floor((e.clientY - ($items.value.offsetTop - $items.value.scrollTop)) / 43)
  }
  if (files) {
    for (let i = 0; i < nbItems; i++) {
      const index = dropId.value + i
      if (index > 199) continue
      const file: File | null = files.item(i)
      if (file) {
        if ((file as FileWithPath).path) {
          sampleStore.update(index, file.name, (file as FileWithPath).path)
        }
      }
    }
  }
}
</script>
<template>
  <div ref="$items" class="list">
    <div class="items">
      <Item v-for="(i, n) in 200" :sound="sampleStore.samples[n]" :key="`sound${n}`" />
      <div :class="dropzone ? 'dropzone no' : 'dropzone'" @dragenter.self="onDragEnter" @dragleave.self="onDragLeave" @dragover.self="onMove" @drop="onDrop"></div>
    </div>
    <div ref="$drop" v-if="drop" class="drop"></div>
  </div>
</template>

<style scoped lang="scss">
.items {
  position: relative;
}
.dropzone {
  position: absolute;
  top: 0px;
  background-color: white;
  opacity: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  &.no {
    pointer-events: all;
  }
}
.drop {
  pointer-events: none;
  position: absolute;
  top: 0px;
  left: 1rem;
  width: calc(100% - 1rem);

  border: 2px solid var(--nord8);
}
.list {
  position: relative;
  padding: 0rem 0rem 1rem 1rem;
  display: flex;

  flex-direction: column;

  overflow-y: auto;
}

.no {
  pointer-events: none;
}
</style>
