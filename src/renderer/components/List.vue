<script setup lang="ts">
import { ref } from 'vue'
import  Item from './Item.vue'


import { VueDraggableNext } from 'vue-draggable-next'

function change(hop:string){
  console.log("hop")  
 
}
function onDragEnter(e:any){
  console.log(e)
  let nbItems =  e.dataTransfer?.items?.length ?? 0;
  console.log("nbItems",nbItems )
        for (let f=0; f<nbItems ;f++) {
            // Using the path attribute to get absolute file path
            //const item = event.dataTransfer?.items.item(0);
            //console.log('File Path of dragged files: ', f)
        }
}
function onDrop(e:any){
  e.preventDefault();
  e.stopPropagation();
  console.log(e.dataTransfer?.items)
  let nbItems =  e.dataTransfer?.items?.length ?? 0;
  for (let f=0; f<nbItems ;f++) {
      // Using the path attribute to get absolute file path
      const item = e.dataTransfer?.items.item(0);
      //console.log('File Path of dragged files: ', f)
    }
}
defineProps<{ list: Array<{id:Number,text:string,changed:boolean}> }>()
// call the function
// //const list = ref()
    // document.addEventListener('dragover', (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //   });
     
    // document.addEventListener('dragenter', (event) => {
    //     console.log('File is in the Drop Space');
    // });
     
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
<div class="list" @dragenter.self="onDragEnter" @drop.self="onDrop">
  <Item v-for="sound in list" :sound="sound" :key="`sound${sound.id}`"/>
</div>
</template>

<style scoped>
.list{
  flex:1;
  overflow-y: auto;
  padding:0rem 1rem 1rem 1rem;

}
.number{
  color: "#bf616a"
}
.table{
  width:100%;
  padding:0px;
  margin:0px;
  border: 1px solid #888;
 
}

.ghost{
    width:100%;
  text-align: left;
  color: #888;
  opacity: 0.5;
  padding:0.5rem;
  padding-left: 1rem;
  list-style: none;
}
</style>
