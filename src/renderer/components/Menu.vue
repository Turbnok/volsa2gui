<script setup lang="ts">
import { ref } from 'vue'
// type-based
const emit = defineEmits<{
  (e: 'refresh_list', list: Array<string>|string): void
  (e: 'check', result: boolean): void
  (e: 'error', message: string): void
  (e: 'help'): void
}>()
async function listDirs(){
  const list = await window.volsa.list();
  if(list==="no volca"){
    emit("error","Error: could not find volca sample. Is it plugged ?");
  }else{
    emit("refresh_list",list);
  }
}
async function check(){
  const result = await window.fs.debuge();
}
async function help(){
  emit("help");
}
const list = ref()
</script>
<template>
  <div class="header">
    <img class="sample2" src="/volca2.svg" alt="Sample2" />
    <h2 class="title">Volsa2 gui</h2>
    <div class="help"><button @click="help">?</button></div>
  </div>
  <div class="menu">   
    <div class="left">
      <button type="button" @click="listDirs">list</button>
      <button type="button" @click="listDirs">send</button>
    </div>
    <div class="right">
      <button type="button" >clear all</button>
      <button type="button" @click="check">check</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.title{
  flex:1,
}
.help{
  display: flex;
  align-items: center;
  button{
    display:flex;
    padding:0;
    height:30px;
    width:30px;
    justify-content:center;
    align-items:center;
    border-radius: 100%;
  }
}
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

</style>
