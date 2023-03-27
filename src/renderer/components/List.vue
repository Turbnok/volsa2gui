<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";

import Item from "./Item.vue";
import { Sound } from "../typings/electron";
interface Props {
  list: Array<Sound>;
}
const $items: Ref<HTMLElement | null> = ref(null);
const $drop: Ref<HTMLElement | null> = ref(null);

const props = defineProps<Props>();
const drop = ref(false);
const dropId = ref(0);
const dropzone = ref(false);
const offsetY = ref(0);
const emit = defineEmits<{
  (e: "error", message: string): void;
}>();

async function download(id: number) {
  const result = await window.volsa.download(id);
  if (result === "no volca") {
    props.list.forEach((element: Sound) => {
      if (element.id === id) {
        element.changed = true;
      }
    });
    emit("error", "Error: could not find volca sample. Is it plugged ?");
  } else {
    props.list.forEach((element: Sound) => {
      if (element.id === id) {
        element.file = result;
      }
    });
  }
}

async function upload(id: number, path: string) {
  const result = await window.volsa.upload(id, path);
  if (result === "no volca") {
    props.list.forEach((element: Sound) => {
      if (element.id === id) {
        element.changed = true;
      }
    });
    emit("error", "Error: could not find volca sample. Is it plugged ?");
  } else {
    props.list.forEach((element: Sound) => {
      if (element.id === id) {
        element.text = element.textNew ?? "";
        element.changed = false;
        element.file = element.fileNew ?? "";
        element.fileNew = null;
        element.textNew = null;
      }
    });
  }
}
async function remove(id: number) {
  const result = await window.volsa.remove(id);
  if (result === "no volca") {
    props.list.forEach((element: Sound) => {
      if (element.id === id) {
        element.changed = true;
      }
    });
    emit("error", "Error: could not find volca sample. Is it plugged ?");
  } else {
    props.list.forEach((element: Sound) => {
      if (element.id === id) {
        element.text = "";
        element.length = 0;
        element.speed = 0;
        element.changed = true;
        element.file = "";
      }
    });
    //{id:v.id,text:v.name,length:v.length,speed:v.speed,changed:false,file:null}
  }
}
/*
document.addEventListener('dragexit',(e:any)=>{
  console.log("on Drag Exit")
  drop.value = false;
})*/
function onDragLeave(e: any) {
  e.preventDefault();

  console.log("on Drag Leave");

  drop.value = false;
}

document.addEventListener("mouseleave", (e: any) => {
  e.preventDefault();

  dropzone.value = true;
});
document.addEventListener("mouseenter", (e: any) => {
  e.preventDefault();

  dropzone.value = false;
});
function onDragEnter(e: any) {
  e.preventDefault();

  drop.value = true;

  let nbItems = e.dataTransfer?.items?.length ?? 0;
  console.log("ITEMS", nbItems);

  for (let f = 0; f < nbItems; f++) {
    // Using the path attribute to get absolute file path
    //const item = event.dataTransfer?.items.item(0);
    //console.log('File Path of dragged files: ', f)
  }
}
function onMove(e: any) {
  e.preventDefault();
  if ($items.value) {
    dropId.value = Math.floor(
      (e.clientY - ($items.value.offsetTop - $items.value.scrollTop)) / 43
    );
    offsetY.value = dropId.value * 43;
  }
  let nbItems = e.dataTransfer?.items?.length ?? 0;
  if ($drop.value) {
    $drop.value.style.top = `${offsetY.value}px`;
    $drop.value.style.height = `${nbItems * 43}px`;
  }
}
function onDrop(e: DragEvent) {
  drop.value = false;
  const files: FileList | undefined = e.dataTransfer?.files;
  const nbItems = e.dataTransfer?.files.length ?? 0;
  if ($items.value) {
    dropId.value = Math.floor(
      (e.clientY - ($items.value.offsetTop - $items.value.scrollTop)) / 43
    );
  }
  if (files) {
    for (let i = 0; i < nbItems; i++) {
      const index = dropId.value + i;
      if (index > 199) continue;
      const file: File | null = files.item(i);
      if (file) {
        if (file.path) {
          props.list[index].fileNew = file.path;
          props.list[index].textNew = file.name;
          props.list[index].changed = true;
        }
      }
    }
  }
}

/*
// call the function
// //const list = ref()
 document.addEventListener('dragover', (event) => {
  event.preventDefault();
  event.stopPropagation();
  console.log(event.clientY);
    console.log(event.dataTransfer?.items)

});
  
 document.addEventListener('dragenter', (event) => {
     console.log('File is in the Drop Space');
     drop.value = true;
 });
  */
// document.addEventListener('dragleave', (event) => {

//     console.log('File has left the Drop Space');
// });
// document.addEventListener('drop', (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     console.log(event.dataTransfer?.items)
//     let nbItems =  event.dataTransfer?.items?.length ?? 0;
//     for (let f=0; f<nbItems ;f++) {
//         // Using the path attribute to get absolute file path
//         //const item = event.dataTransfer?.items.item(0);
//         console.log('File Path of dragged files: ', f)
//     }
// });
</script>
<template>
  <div ref="$items" class="list">
    <div class="items">
      <Item
        v-on:remove="remove"
        v-on:upload="upload"
        v-on:download="download"
        v-for="(i, n) in 200"
        :sound="list[n]"
        :key="`sound${n}`"
      />
      <div
        :class="dropzone ? 'dropzone no' : 'dropzone'"
        @dragenter.self="onDragEnter"
        @dragleave.self="onDragLeave"
        @dragover.self="onMove"
        @drop="onDrop"
      ></div>
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
