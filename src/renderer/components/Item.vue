
<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps(['sound'])
// type-based
//check();
</script>

<template>
    <div class="row" >
        <div><span class="number">{{ props.sound.id.toString().padStart(3,"0") }}</span> : {{ props.sound.text}}</div>  
        <div></div>
    </div>
</template>

<style scoped lang="scss">
.number{
    color:#bf616a;
}
.row {
  //border-bottom: 1px solid #888;
    width:100%;
    text-align: left;
    color: #888;
    padding:0.5rem;
    list-style: none;
    background-color: #242424;
    &:nth-child(2n){
        background-color: #282828;
    }  
}
.row:last-child{
  border-bottom: 0px;
  
}
</style>
