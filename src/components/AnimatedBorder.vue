<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Direction } from '../types/models'

defineProps<{
  position: Direction
}>()

const slotSize = ref({ width: 0, height: 0 })
const slotContainer = ref<HTMLElement | null>(null)

const updateSlotSize = () => {
  if (slotContainer.value) {
    slotSize.value = {
      width: slotContainer.value.clientWidth,
      height: slotContainer.value.clientHeight,
    }
  }
}

onMounted(() => {
  updateSlotSize()
  window.addEventListener('resize', updateSlotSize)
})
</script>

<template>
  <div class="relative">
    <svg
      :class="[
        'anim-border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        {
          '-rotate-90': position === Direction.Left,
          'rotate-90': position === Direction.Right,
          '-rotate-180': position === Direction.Up,
          'rotate-180': position === Direction.Down,
        },
      ]"
      :width="
        position === Direction.Up || position === Direction.Down
          ? slotSize.width + 8
          : slotSize.height + 8
      "
      :height="
        position === Direction.Up || position === Direction.Down
          ? slotSize.height + 8
          : slotSize.width + 8
      "
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="4"
        :width="
          position === Direction.Up || position === Direction.Down
            ? slotSize.width
            : slotSize.height
        "
        :height="
          position === Direction.Up || position === Direction.Down
            ? slotSize.height
            : slotSize.width
        "
        rx="8"
        ry="8"
        fill="none"
        stroke="#f97316"
        stroke-width="8"
        :stroke-dasharray="(slotSize.width + slotSize.height) * 2 - 16"
        :stroke-dashoffset="(slotSize.width + slotSize.height) * 2 - 16"
        stroke-linecap="round"
      />
    </svg>
    <div ref="slotContainer">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.anim-border rect {
  animation: appear 3s forwards;
}

@keyframes appear {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
