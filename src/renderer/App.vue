<script setup lang="ts">
import { ref } from 'vue'

import Menu from './components/Menu.vue'
import List from './components/List.vue'
import Erro from './components/Error.vue'
import { isArray } from '@vue/shared';
const list = ref(Array(200).fill("").map((a,i)=>{return {id:i+1,text:"-",changed:false}}));
const msg = ref("");
const type = ref("error");

function close(){
  msg.value="";
  type.value="error"
}
function help(){
  msg.value="help";
  type.value="infos"
}
function refreshList(pList:Array<string>|string){
  if(isArray(pList)){
    list.value = pList.map(((v,i)=> {
      return {"id":i,"text":v,"changed":false,"file":null}
    }));
  }
}
function error(message:string){
  console.log("Error ? ", message)
  msg.value = message
}
function update(){
  list.value[0].text = "hop"
  //list.value[0]. = "hop"
  list.value[1].changed = true
}
</script>
<template>
  
  <Erro v-on:close="close"  :msg="msg" :type="type"/>  
  <Menu v-on:help="help" v-on:refresh_list="refreshList" v-on:error="error"/>

  <List :list="list"/>
</template>
<style>

</style>
