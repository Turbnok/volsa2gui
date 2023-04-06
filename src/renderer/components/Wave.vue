<script setup lang="ts">
import { ref } from "vue"
import WaveformData from "waveform-data"
const canvass = ref(null)
const mess = ref("hmm")
const f = async function () {
  const audioData = await fetch("/Alarm04.wav")
    .then((r) => r.arrayBuffer())
    .catch((e) => {
      console.log("hop ?")
      mess.value = e
    })
  console.log(audioData)
  const audioCtx = new AudioContext({ sampleRate: 44100 })

  const decodedData = await audioCtx.decodeAudioData(audioData) // audio is resampled to the AudioContext's sampling rate

  console.log(decodedData.length, decodedData.duration, decodedData.sampleRate, decodedData.numberOfChannels)
}
const scaleY = (amplitude, height) => {
  const range = 256
  const offset = 128

  return height - ((amplitude + offset) * height) / range
}
const draw = function (waveform) {
  console.log("CAVA ", waveform)
  const ctx = canvass.value?.getContext("2d")
  ctx.beginPath()

  const channel = waveform.channel(0)
  console.log( waveform.length)

  // Loop forwards, drawing the upper half of the waveform

  for (let x = 0; x < waveform.length; x++) {
    const val = channel.max_sample(x)

    ctx.lineTo(x + 0.5, scaleY(val,256) + 0.5)
  }

  // Loop backwards, drawing the lower half of the waveform
  for (let x = waveform.length - 1; x >= 0; x--) {
    const val = channel.min_sample(x)

    ctx.lineTo(x + 0.5, scaleY(val, 256) + 0.5)
  }

  ctx.closePath()
  ctx.stroke()
  ctx.fill()
}
const deuz = async function () {
  const audioContext = new AudioContext()

  fetch("/Alarm04.wav")
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const options = {
        audio_context: audioContext,
        array_buffer: buffer,
        scale: 128,
      }

      return new Promise((resolve, reject) => {
        WaveformData.createFromAudio(options, (err, waveform) => {
          if (err) {
            reject(err)
          } else {
            resolve(waveform)
          }
        })
      })
    })
    .then((waveform) => {
      console.log(`Waveform has ${waveform.channels} channels`)
      console.log(`Waveform has length ${waveform.length} points`)
      draw(waveform)
    })
}
/*

const float32Data = decodedData.getChannelData(0)
*/
</script>
<template>
  <audio controls src="/Alarm04.wav"></audio>
  <button @click="deuz">hop</button>
  <canvas id="hop" ref="canvass" width="2000"/>
  <!--<div class="coucou">"ouhlala" {{ mess }}</div>-->
</template>

<style scoped lang="scss">
audio {
  display: block;
  height: 300px;
}
.coucou {
  background-color: red;
}
</style>
