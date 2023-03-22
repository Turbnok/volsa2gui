
<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps(['sound'])
// type-based




//check();
</script>

<template>
    <div class="row" ><span class="number">{{ props.sound.id }}</span> : {{ props.sound.text}}</div>  
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
