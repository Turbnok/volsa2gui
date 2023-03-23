
<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps(['sound'])

// type-based
//check();
</script>

<template>
    <div class="row" >
        <div class="status">•</div>
        <div class="name"><span class="number">{{ props.sound.id.toString().padStart(3,"0") }}</span> : {{ props.sound.text}}</div>  
        <div class="actions"><button disabled >↧</button><button disabled >↥</button><button disabled >⟲</button><button disabled >⨯</button></div>
    </div>
</template>

<style scoped lang="scss">
button{
    margin-left: 0.2rem;
    padding: 0.2rem 0.4rem;
}
.status{
    flex-direction: row;
    align-items: center; 
}
.name{

flex:1;
}
.actions{
    justify-self: flex-end;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.number{
    color:#bf616a;
    font-family: 'Courier New', Courier, monospace;
}
.row {
  //border-bottom: 1px solid #888;
    display: flex;
    flex-direction: row;
    align-items: center;
    //justify-content: center;
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
