<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps(['msg'])
// type-based
const emit = defineEmits<{
  (e: 'close'): void
  
}>()

async function check(){
    volsa.value = await window.fs.checkvolsa();
}
function onVolsa(e:any){
   e.preventDefault();
   window.electronAPI.openURL("https://github.com/00nktk/volsa2")
}
const volsa = ref(true);
const msg = ref("");
function close(){
emit("close")
  msg.value="";
}
watch(() => props.msg, (pMsg) => {
    msg.value = pMsg
});
check();
</script>

<template>
<div @click="close" class="error" v-if="!volsa||msg.length">
    <div class="message" v-if="msg.length">{{ msg }}</div>
    <div class="message" v-if="!volsa">Error : volsa2-cli is not installed or not in `/home/$USER/.cargo/bin/volsa2-cli`, please check <a @click="onVolsa">https://github.com/00nktk/volsa2</a> README.md</div>
</div>
</template>

<style scoped>
    .error{
        backdrop-filter: blur(10px);
        position: absolute;
        width:100vw;
        height: 100vh;
        margin:0rem;
        display: flex;
        align-items: center;        
        justify-content: center;
        
    }
    .message{

        margin: 1rem;
        padding:1rem;
        border: 1px solid #bf616a;
        background-color: rgb(191, 97, 106,0.3);
        border-radius: 0.5rem;
    }
    .error a {
        color: #bf616a;
        text-decoration: underline;
        cursor: pointer;
    }
</style>
