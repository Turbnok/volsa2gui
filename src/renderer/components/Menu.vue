<script setup lang="ts">
import { ref } from 'vue'


// type-based
const emit = defineEmits<{
  (e: 'refresh_list', list: Array<string>|string): void
  (e: 'check', result: boolean): void
  (e: 'error', message: string): void
}>()


defineProps<{ msg: string }>()
// call the function
async function listDirs(){
  const list = await window.volsa.list();
  console.log(list)
  if(list==="no volca"){
    emit("error","Error: could not find volca sample. Is it plugged ?");
  }else{
    emit("refresh_list",list);
  }
  
  // execute('ls ../', (output:String) => {
  //   console.log("EXECUTE");
  //     emit("refresh_list",output.split("\n"));
  // });  
}
async function hop(){
  console.log("HOP ???")
  //window.electronAPI.loadPreferences()

  const list = await window.volsa.list()

  console.log("list ", list)
  //emit("refresh_list",list);
 // window["MY_APP_NAMESPACE"].openDialog();
}
async function check(){
  const result = await window.fs.debuge();
  console.log("reuslt", result)
  //emit("check",result);
 // window["MY_APP_NAMESPACE"].openDialog();
}
const list = ref()
</script>

<template>
  <div class="header">
    <img class="sample2" src="/volca2.svg" alt="Sample2" />
    <h2>Volsa2 gui</h2>
  </div>
  <div class="menu">
   
    <div class="left">
      <button type="button" @click="listDirs">list</button>
      <button type="button" @click="listDirs">send</button>
    </div>
    <div class="right">
      <button type="button" @click="hop">clear all</button>
      <button type="button" @click="check">check</button>
    </div>
  </div>
</template>

<style scoped>
.header{
  padding:0rem 1rem;
  display: flex;
  flex-direction: row;
}
.sample2{
  width: 75px;
}
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
