<script setup lang="ts">
import { ref } from 'vue'

import Menu from './components/Menu.vue'
import List from './components/List.vue'
import Erro from './components/Error.vue'
import { isArray } from '@vue/shared';
const list = ref(Array(200).fill("hop").map((a,i)=>{return {id:i+1,text:"-",moved:false}}));
const msg = ref("");
//Array(200).fill("hop").map(()=>{return {id:0,text:"hop",moved:false}}
console.log();
function close(){
  msg.value="";
}
function refreshList(pList:Array<string>|string){
  if(isArray(pList)){
    list.value = pList.map(((v,i)=> {
      return {"id":i,"text":v,"moved":false}
    }));
  }
}
function error(message:string){
  console.log("Error ? ", message)
  msg.value = message
}
</script>
<template>
  <Erro v-on:close="close"  :msg="msg"/>  
  <Menu msg="lapin" v-on:refresh_list="refreshList" v-on:error="error"/>
  <List :list="list"/>
</template>

<style>

</style>
