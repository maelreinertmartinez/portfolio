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
      <span class="button-side-top button-side"></span>
      <span class="button-side-bottom button-side"></span>
      <span class="button-side-left button-side"></span>
      <span class="button-side-right button-side"></span>
      <AnimatedText :isReverse="isLaunching">LAUNCH</AnimatedText>
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

.button-side,
.button-side::after {
  content: '';
  position: absolute;
  pointer-events: none;
}

.button-side-bottom {
  width: 100vw;
  height: 4px;
  left: 0;
  bottom: 0;
  overflow: hidden;
}

.button-side-top {
  width: 100vw;
  height: 4px;
  right: 0;
  top: 0;
  overflow: hidden;
}

.button-side-top::after {
  background: #f97316;
  width: 266px;
  height: 4px;
  right: 0;
  transform: translateX(-100vw);
  transition: transform 0.6s ease;
}

.button-side-bottom::after {
  background: #f97316;
  width: 266px;
  height: 4px;
  left: 0;
  transform: translateX(100vw);
  transition: transform 0.6s ease;
}

.launching .button-side-top::after {
  transform: translateX(-100vw) !important;
}

.launching .button-side-bottom::after {
  transform: translateX(100vw) !important;
}

.launching .button-side-left::after {
  transform: translateY(-100%) !important;
}

.launching .button-side-right::after {
  transform: translateY(100%) !important;
}

.button-side-left,
.button-side-right {
  width: 4px;
  height: 100%;
  overflow: hidden;
}

.button-side-left {
  top: 0;
  right: 0;
}

.button-side-left::after,
.button-side-right::after {
  content: '';
  background: #f97316;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease;
}

.button-side-left::after {
  right: 0;
  transform: translateY(-100%);
}

.button-side-right {
  bottom: 0;
  left: 0;
}

.button-side-right::after {
  left: 0;
  transform: translateY(100%);
}

button:hover .button-side-bottom::after {
  transform: translateX(-68px);
  transition: transform 0.4s ease;
}

button:hover .button-side-top::after {
  transform: translateX(68px);
  transition: transform 0.4s ease;
}

button:hover .button-side-left::after,
button:hover .button-side-right::after {
  transition-delay: 0.2s;
  transform: translateY(0);
}

.launching .text {
  animation: typing-reverse 1.5s forwards !important;
}

.launching .cursor {
  animation: cursor-reverse 1.5s forwards !important;
}

@keyframes typing-reverse {
  0%,
  20% {
    clip-path: inset(0 0 0 0);
  }
  80%,
  100% {
    clip-path: inset(0 0 0 100%);
  }
}

@keyframes cursor-reverse {
  0% {
    height: 0px;
    left: calc(100% + 3px);
  }
  20% {
    height: 20px;
    left: calc(100% + 3px);
  }
  85% {
    height: 20px;
    left: 0;
  }
  100% {
    height: 0px;
    left: 0;
  }
}
</style>
