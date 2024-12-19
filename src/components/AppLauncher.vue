<script setup lang="ts">
import AnimatedText from './AnimatedText.vue'
</script>

<template>
  <div class="flex justify-center items-center h-full">
    <button class="text-3xl font-bold tracking-wider" @click="$emit('launch')">
      <span class="button-side-top button-side"></span>
      <span class="button-side-bottom button-side"></span>
      <span class="button-side-left button-side"></span>
      <span class="button-side-right button-side"></span>
      <AnimatedText>LAUNCH</AnimatedText>
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
  transition: transform 0.4s ease;
  transition-delay: 0.2s;
}

.button-side-bottom::after {
  background: #f97316;
  width: 266px;
  height: 4px;
  left: 0;
  transform: translateX(100vw);
  transition: transform 0.4s ease;
  transition-delay: 0.2s;
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
</style>
