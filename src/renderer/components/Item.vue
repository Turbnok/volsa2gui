
<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps(['sound'])
const processing = ref(false);
// type-based
//check();
function clear(){
    processing.value = true;

}
watch(() => props.sound.changed, (pMsg) => {
    console.log("change ?")
    processing.value = false;
});
</script>

<template>
    <div class="row" >
        <!-- <div class="status"><div> -->
        <div class="name"><span class="number">{{ props.sound.id.toString().padStart(3,"0") }}</span> : {{ props.sound.text}}</div>  
        <div v-if="processing" class="loader" >
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <!-- No dashes nor gaps -->
                <rect  width="20" height="20" />
                <!-- Dashes and gaps of the same size -->
                
            </svg>
        </div>
        <div class="actions">
            <button :disabled="!props.sound.file" >♪</button>
            <button :disabled="props.sound.changed" >↧</button>
            <button :disabled="!props.sound.changed" >↥</button>
            <button :disabled="!props.sound.changed" >⟲</button>
            <button @click="clear">⨯</button></div>
    </div>
</template>

<style scoped lang="scss">
@keyframes progress {
    from {
        stroke-dashoffset: 200%;
    }

    to {
        stroke-dashoffset: 0%;
    }
}
.loader{
    display: flex;
    align-items: center;
    width: 20px;
    

    //padding: 0.5rem;
    rect{
        stroke:#bf616a;
        stroke-width: 4px;
        stroke-dasharray: 100%;
        fill: none;
    }
  
    animation: progress  0.5s linear infinite;
}

button{
    margin-left: 0.2rem;
    padding: 0.2rem 0.4rem;
    width: 2rem;
    vertical-align: middle;
}
.status{
    flex-direction: row;
    align-items: center; 
}
.name{
color: var(--nord4);
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
    display: flex;
    flex-direction: row;
    align-items: center;
    //justify-content: center;
    width:100%;
    text-align: left;
    color: #888;
    padding:0.5rem;
    list-style: none;
    background-color: var(--nord1);
    &:nth-child(2n){
        background-color: var(--nord2);        
    }
}
.row:last-child{
  border-bottom: 0px;
  
}
</style>
