<script setup lang="ts">
import AnimatedText from './AnimatedText.vue'
import { ref } from 'vue'

const isLaunching = ref(false)

const handleLaunch = () => {
  isLaunching.value = true
  setTimeout(() => {
    emit('launch')
  }, 1500)
}

const emit = defineEmits(['launch'])
</script>

<template>
  <div class="flex justify-center items-center h-full">
    <button
      class="text-3xl font-bold tracking-wider"
      @click="handleLaunch"
      :class="{ launching: isLaunching }"
    >
      <AnimatedText :isDisappearing="isLaunching">LAUNCH</AnimatedText>
    </button>
  </div>
</template>

<style scoped>
button {
  position: relative;
  padding: 1rem 2rem;
  color: #374151;
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>
