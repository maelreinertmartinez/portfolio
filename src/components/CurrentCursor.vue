<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isHoveringClickableElement = ref<boolean | undefined>(undefined)

const updateRadius = (hover: boolean) => {
  const rects = document.querySelectorAll('.cursor-svg rect')
  rects.forEach((rect) => {
    rect.setAttribute('rx', hover ? '22' : '5')
    rect.setAttribute('ry', hover ? '22' : '5')
  })
}

const updateCursorPosition = (e: MouseEvent) => {
  const cursor = document.querySelector('.cursor-svg')
  cursor!.setAttribute('style', `left: ${e.clientX}px; top: ${e.clientY}px`)

  const element = document.elementFromPoint(e.clientX, e.clientY)
  const lastIsHoveringClickableElement = isHoveringClickableElement.value

  if (isHoveringClickableElement.value === undefined) {
    isHoveringClickableElement.value =
      element?.matches('button, a') || element?.closest('button, a') !== null
    updateRadius(isHoveringClickableElement.value)
  } else {
    isHoveringClickableElement.value =
      element?.matches('button, a') || element?.closest('button, a') !== null
    if (isHoveringClickableElement.value !== lastIsHoveringClickableElement)
      updateRadius(isHoveringClickableElement.value)
  }
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
    <circle cx="21" cy="21" r="1" stroke="#ddd6cc" fill="#ddd6cc" stroke-width="10" />
    <circle cx="21" cy="21" r="1" stroke="#374151" fill="#374151" stroke-width="5" />
    <rect
      class="outer-rect"
      x="5"
      y="5"
      width="32"
      height="32"
      rx="16"
      ry="16"
      stroke="#ddd6cc"
      fill="transparent"
      stroke-width="9"
    />
    <rect
      class="inner-rect"
      x="5"
      y="5"
      width="32"
      height="32"
      rx="16"
      ry="16"
      stroke="#374151"
      fill="transparent"
      stroke-width="4"
    />
  </svg>
</template>

<style>
* {
  cursor: none !important;
}

.cursor-svg {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
}

.cursor-svg rect {
  transition: all 0.25s ease;
}

.cursor-svg rect,
.cursor-svg circle {
  animation: appear 0.5s forwards;
}

@keyframes appear {
  from {
    width: 0px;
    height: 0px;
    r: 0;
    x: 21px;
    y: 21px;
  }
  to {
    width: 32px;
    height: 32px;
    r: 1px;
    x: 5px;
    y: 5px;
  }
}
</style>
