<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue'

defineProps<{
  name: string
  size?: number
  color?: string
  strokeWidth?: number
  defaultClass?: string
}>()
</script>

<template>
  <BaseIcon
    :name="name"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :default-class="defaultClass"
  />
</template>

<style scoped>
.lucide {
  stroke-dasharray: 70;
  stroke-dashoffset: 70;
  stroke-linecap: round;
  animation: appear 3s forwards;
}

@keyframes appear {
  from {
    stroke-dashoffset: 70;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
