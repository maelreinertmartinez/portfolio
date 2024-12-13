<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const updateRadius = (hover: boolean) => {
  const rects = document.querySelectorAll('.cursor-svg rect')
  rects.forEach((rect) => {
    rect.setAttribute('rx', hover ? '5' : '22')
    rect.setAttribute('ry', hover ? '5' : '22')
  })
}

const updateCursorPosition = (e: MouseEvent) => {
  const cursor = document.querySelector('.cursor-svg')
  cursor!.setAttribute('style', `left: ${e.clientX}px; top: ${e.clientY}px`)

  const element = document.elementFromPoint(e.clientX, e.clientY)
  const isClickable = element?.matches('button, a') || element?.closest('button, a') !== null
  updateRadius(isClickable)
}

const initializeCursorPosition = () => {
  const cursor = document.querySelector('.cursor-svg')
  cursor!.setAttribute('style', `left: -100px`)
}

onMounted(() => {
  document.addEventListener('mousemove', updateCursorPosition)
  initializeCursorPosition()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursorPosition)
})
</script>

<template>
  <svg width="54" height="54" version="1.1" xmlns="http://www.w3.org/2000/svg" class="cursor-svg">
    <rect
      class="outer-rect"
      x="5"
      y="5"
      width="44"
      height="44"
      rx="22"
      ry="22"
      stroke="#ddd6cc"
      fill="transparent"
      stroke-width="10"
    />
    <rect
      class="inner-rect"
      x="5"
      y="5"
      width="44"
      height="44"
      rx="22"
      ry="22"
      stroke="#374151"
      fill="transparent"
      stroke-width="5"
    />
    <circle cx="27" cy="27" r="1" stroke="#ddd6cc" fill="#ddd6cc" stroke-width="12" />
    <circle cx="27" cy="27" r="1" stroke="#374151" fill="#374151" stroke-width="7" />
  </svg>
</template>

<style>
/* Style global pour cacher le curseur par défaut */
* {
  cursor: none !important;
}

/* Vos styles existants */
.cursor-svg {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
}

.cursor-svg rect {
  transition: all 0.3s ease;
}
</style>
