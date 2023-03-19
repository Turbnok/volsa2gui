<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Menu from './components/Menu.vue'
import List from './components/List.vue'
const list = ref([{id:0,text:"hop",moved:false}]);
function refreshList(pList:Array<string>){
  list.value = pList.map(((v,i)=> {
    return {"id":i,"text":v,"moved":false}
  }));
  
}
</script>


<template>
  <Menu msg="lapin" v-on:refresh_list="refreshList"/>
  <List :list="list"/>
</template>

<style>

</style>
