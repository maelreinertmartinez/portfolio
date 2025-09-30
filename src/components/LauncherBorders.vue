<script setup lang="ts">
import RoundedRectangle from '@/utils/RoundedRectangle'
import { onMounted, onUnmounted, ref, computed, defineExpose } from 'vue'

// Interface to type the props
interface Props {
  borderRadius: number
  borderThickness: number
  paddingX: number
  paddingY: number
  borderColor: string
  animationDuration: number
  visible: boolean
}

const props = defineProps<Props>()

// Refs and local states
const bigRectangle = ref<RoundedRectangle>(new RoundedRectangle(0, 0))
const smallRectangle = ref<RoundedRectangle>(new RoundedRectangle(0, 0))
const content = ref<HTMLDivElement | null>(null)
const contentWidth = ref(0)
const contentHeight = ref(0)
const windowWidth = ref(0)
const resizeTimeout = ref<number | null>(null)

// SSR-safe: initialize windowWidth only on client side
if (typeof window !== 'undefined') {
  windowWidth.value = window.innerWidth
}

// Compute the animated border dimensions
const animatedBorderWidth = computed(() => {
  return (
    props.borderThickness * 1.5 +
    props.paddingX +
    (contentWidth.value + windowWidth.value) / 2 +
    props.borderRadius
  )
})

const animatedBorderHeight = computed(() => {
  return contentHeight.value + props.borderThickness * 2 + props.paddingY * 2
})

// Calculate perimeters for stroke animations
const bigPerimeter = computed(() => bigRectangle.value.getPerimeter() + 4 * props.borderThickness)
const smallPerimeter = computed(
  () => smallRectangle.value.getPerimeter() + 4 * props.borderThickness,
)

const hiddenStrokeDashoffset = computed(() => `${smallPerimeter.value / 2}px`)
const visibleStrokeDashoffset = computed(
  () => `-${bigPerimeter.value / 2 - smallPerimeter.value / 2}px`,
)

const strokeDasharray = computed(() => `${smallPerimeter.value / 2}px 10000px`)
const strokeDashoffset = computed(() =>
  props.visible ? visibleStrokeDashoffset.value : hiddenStrokeDashoffset.value,
)

const transitionTimingFunction = computed(() =>
  props.visible ? 'cubic-bezier(0,0,.4,1)' : 'cubic-bezier(.6,0,1,1)',
)

// Debounced update of window width on resize event
function updateWindowWidth() {
  if (resizeTimeout.value) {
    clearTimeout(resizeTimeout.value)
  }
  resizeTimeout.value = window.setTimeout(() => {
    windowWidth.value = window.innerWidth
    updateRectangles()
  }, 100) // 100ms delay
}

// Update content size (slot) dimensions
function updateContentDimensions() {
  if (content.value) {
    contentWidth.value = content.value.offsetWidth
    contentHeight.value = content.value.offsetHeight
  }
}

// Update the rectangles according to latest measurements
function updateRectangles() {
  bigRectangle.value = new RoundedRectangle(
    animatedBorderWidth.value,
    animatedBorderHeight.value,
    props.borderRadius,
  )

  smallRectangle.value = new RoundedRectangle(
    contentWidth.value + props.paddingX * 2,
    contentHeight.value + props.paddingY * 2,
    props.borderRadius,
  )
}

// Main update function with well-separated responsibilities
function updateDimensionsAndRectangles() {
  updateContentDimensions()
  updateRectangles()
}

function fullUpdate() {
  updateWindowWidth() // windowWidth updated with debounce
  updateDimensionsAndRectangles()
}

// Vue lifecycle hooks, resize listener only on client
onMounted(() => {
  if (typeof window !== 'undefined') {
    updateDimensionsAndRectangles()
    window.addEventListener('resize', updateWindowWidth)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateWindowWidth)
    if (resizeTimeout.value) {
      clearTimeout(resizeTimeout.value)
    }
  }
})

// Expose more descriptive update functions
defineExpose({
  updateDimensionsAndRectangles,
  fullUpdate,
})
</script>

<template>
  <div class="top-1/2 -translate-y-1/2 relative">
    <div
      ref="content"
      class="left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 absolute"
      aria-label="Content"
    >
      <slot>
        <p class="text-gray-500 italic select-none">Content missing</p>
      </slot>
    </div>

    <svg
      :width="windowWidth"
      :height="animatedBorderHeight"
      :viewBox="`0 0 ${windowWidth} ${animatedBorderHeight}`"
      aria-hidden="true"
      role="presentation"
      :style="{
        'stroke-dasharray': strokeDasharray,
        'stroke-dashoffset': strokeDashoffset,
        'transition-timing-function': transitionTimingFunction,
        'transition-duration': `${props.animationDuration}s`,
      }"
      :class="[
        'top-1/2 -translate-y-1/2 absolute pointer-events-none transition-stroke-dashoffset',
        `drop-shadow-[0_0_2px_${props.borderColor}]`,
      ]"
    >
      <rect
        :x="-props.borderRadius"
        :y="props.borderThickness / 2"
        :width="animatedBorderWidth - props.borderThickness"
        :height="animatedBorderHeight - props.borderThickness"
        :rx="props.borderRadius"
        :stroke="props.borderColor"
        :stroke-width="props.borderThickness"
        stroke-linecap="round"
        fill="none"
        class="origin-center rotate-180"
      />
      <rect
        :x="-props.borderRadius"
        :y="props.borderThickness / 2"
        :width="animatedBorderWidth - props.borderThickness"
        :height="animatedBorderHeight - props.borderThickness"
        :rx="props.borderRadius"
        :stroke="props.borderColor"
        :stroke-width="props.borderThickness"
        stroke-linecap="round"
        fill="none"
      />
    </svg>
  </div>
</template>

<style scoped>
/* Extract transition animation styles into CSS for maintainability */
.transition-stroke-dashoffset {
  transition-property: stroke-dashoffset;
}
</style>
