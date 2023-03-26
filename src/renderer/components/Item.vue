
<script setup lang="ts">
import { EMPTY_OBJ } from '@vue/shared';
import { ref, computed, watch } from 'vue'
import { Sound } from '../typings/electron';

interface Props {
  sound: Sound
 
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'remove',id:number): void
  (e: 'download',id:number): void
  (e: 'upload',id:number, path:string): void
  (e: 'play',file:string): void
  (e: 'reset'): void
}>()
const processing = ref(false);
function reset(){
    props.sound.fileNew = 
    props.sound.textNew = null;
    props.sound.changed = false;
    
}

function remove(){
    processing.value = true;
    emit("remove",props.sound.id);
}
function play(){
    const sound = props.sound.fileNew ? props.sound.fileNew :props.sound.file;
    if(sound) window.fs.play(sound);
}
function upload(){
    
    processing.value = true;
    if(props.sound.fileNew){
        emit("upload",props.sound.id,props.sound.fileNew);
    }
}
function dowload(){
    processing.value = true;
    emit("download",props.sound.id);
}
watch(() => [props.sound.changed,props.sound.file,props.sound.text], (pMsg) => {
    processing.value = false;
});
</script>

<template>
    <div class="row" >
        <!-- <div class="status"><div> -->
        <div class="name"><span class="number">{{ props.sound.id.toString().padStart(3,"0") }}</span> : {{props.sound.changed?"✨":""}}{{ props.sound.textNew ? props.sound.textNew :props.sound.text}}<span :class="props.sound.changed?'file new':'file'" v-if="props.sound.file || props.sound.fileNew"> ({{props.sound.fileNew ?? props.sound.file}})</span></div>  
        <div v-if="processing" class="loader" >
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <!-- No dashes nor gaps -->
                <rect  width="20" height="20" />
                <!-- Dashes and gaps of the same size -->
                
            </svg>
        </div>
        <div class="actions">
            <button :disabled="!props.sound.file  && !props.sound.fileNew" @click="play" >♪</button>
            <button :disabled="!props.sound.text || !props.sound.sync || props.sound.file || props.sound.fileNew" @click="dowload">↧</button>
            <button :disabled="!props.sound.fileNew"  @click="upload" >↥</button>
            <button :disabled="!props.sound.changed" @click="reset">⟲</button>
            <button :disabled="!props.sound.sync || !props.sound.text" @click="remove">⨯</button></div>
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
    height:43px;
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
.file{
    font-size: 0.8rem;
    color: var(--nord9);
    &.new{
        color: var(--nord13);
    }
}
.row:last-child{
    border-bottom: 0px;
}
</style>
