<script setup lang="ts">
import { ref } from 'vue'


// type-based
const emit = defineEmits<{
  (e: 'refresh_list', list: Array<string>): void
}>()


defineProps<{ msg: string }>()
// call the function
function listDirs(){
  // execute('ls ../', (output:String) => {
  //   console.log("EXECUTE");
  //     emit("refresh_list",output.split("\n"));
  // });  
}
async function hop(){
  console.log("HOP ???")
  //window.electronAPI.loadPreferences()

  const list = await window.fs.ls();
  console.log("list ", list)
  emit("refresh_list",list);
 // window["MY_APP_NAMESPACE"].openDialog();
}
const list = ref()
</script>

<template>
  <h2>Volsa2 Simple gui</h2>
  <div class="menu">
    <div class="left">
      <button type="button" @click="listDirs">receive</button>
      <button type="button" @click="listDirs">send</button>
    </div>
    <div class="right">
      <button type="button" @click="hop">clear all</button>
    
    </div>
  </div>
</template>

<style scoped>
h2{
  padding:0rem 1rem;
}
.menu{
  box-sizing: border-box;
  padding: 1rem;

  display: flex;
}
.left{
  display: flex;
  align-items: flex-start;
}
.right{
  display:flex;
  flex:1;
  justify-content: flex-end;
  align-items: flex-end;
}
button{
  
  margin-right: 0.5rem;

}
button:last-child{
  margin-right: 0rem;

}
.read-the-docs {
  color: #888;

}
</style>
