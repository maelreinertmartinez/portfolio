<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  visible: boolean
  blinking: boolean
  height: number
}

const props = defineProps<Props>()

const readableBlinking = computed(() => {
  return props.blinking && props.visible ? 'blinking' : ''
})
</script>

<template>
  <div
    :class="[{ blinking: readableBlinking }, 'text-cursor']"
    :style="{ height: `${visible ? props.height : 0}px`, width: `${height / 10}px` }"
  ></div>
</template>

<style scoped>
.text-cursor {
  background-color: #1a1200;
  transition: height 0.5s;
}

.text-cursor.blinking {
  animation: blinking 1s step-end infinite;
}

@keyframes blinking {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
