<script setup lang="ts">
import { ref, onMounted } from 'vue'

const last = ref(0)
const fps = ref(0)

const fpsDisplay = ref(0)

const updateFPSValue = () => {
  const now = performance.now()
  const diff = now - last.value
  last.value = now
  fps.value = Math.round(1000 / diff)
  requestAnimationFrame(updateFPSValue)
}

onMounted(() => {
  updateFPSValue()
  setInterval(() => {
    fpsDisplay.value = fps.value
  }, 500)
})
</script>

<template>
  <div class="fixed p-2 top-0 left-0 bg-white border" ref="fpsCounter">FPS : {{ fpsDisplay }}</div>
</template>
