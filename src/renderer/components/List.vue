<script setup lang="ts">
import { ref } from 'vue'

import { VueDraggableNext } from 'vue-draggable-next'

function change(hop:string){
  console.log("hop")  
 
}

defineProps<{ list: Array<{id:Number,text:string,moved:boolean}> }>()
// call the function
//const list = ref()
document.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
     
    document.addEventListener('dragenter', (event) => {
        console.log('File is in the Drop Space');
    });
     
    document.addEventListener('dragleave', (event) => {
      
        console.log('File has left the Drop Space');
    });
    document.addEventListener('drop', (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(event.dataTransfer?.items)
        let nbItems =  event.dataTransfer?.items?.length ?? 0;
        for (let f=0; f<nbItems ;f++) {
            // Using the path attribute to get absolute file path
            //const item = event.dataTransfer?.items.item(0);
            console.log('File Path of dragged files: ', f)
        }
    });
</script>
<template>
<div class="list">
  <VueDraggableNext 
    class="table"
    :list="list"
    ghost-class="ghost"
    @change="change"
  >
    <div  class="row" v-for="element in list"
        :key="element.id"><span class="number">{{ element.id }}</span> : {{ element.text}}</div>  
  </VueDraggableNext>
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
.row {
  border-bottom: 1px solid #888;
  width:100%;
  text-align: left;
  color: #888;
  padding:0.5rem;
  list-style: none;
  background-color: #242424;
  
}
.row:last-child{
  border-bottom: 0px;
  
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
