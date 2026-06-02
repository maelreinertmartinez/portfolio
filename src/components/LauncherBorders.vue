<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BORDERS } from '@/constants/constants'
import { useWindowResize } from '@/composables/useWindowResize'
import { useResizeObserver } from '@/composables/useResizeObserver'
import { useBorderDimensions } from '@/composables/useBorderDimensions'

/**
 * Reference to the content element (slot)
 */
const content = ref<HTMLDivElement | null>(null)

/**
 * The width of the content element
 */
const contentWidth = ref(0)

/**
 * The height of the content element
 */
const contentHeight = ref(0)

/**
 * Whether an animation is currently in progress
 */
const isAnimating = ref(false)

/**
 * The current transition duration for animations
 */
const transitionDuration = ref<number>(BORDERS.ANIMATION_DURATION)

/**
 * Whether the borders are currently visible
 */
const isVisible = ref(false)

// Use composables
const { windowWidth } = useWindowResize()

const {
  animatedBorderWidth,
  animatedBorderHeight,
  strokeDasharray,
  strokeDashoffset,
  transitionTimingFunction,
  updateDimensionsAndRectangles,
} = useBorderDimensions(contentWidth, contentHeight, windowWidth, isVisible, transitionDuration)

useResizeObserver(
  content,
  (contentElement, skipTransitionReset) =>
    updateDimensionsAndRectangles(contentElement, skipTransitionReset),
  isAnimating,
)

/**
 * Rectangle configurations for the two border rectangles (normal and rotated)
 */
const rectConfigs = [{ rotation: 0 }, { rotation: 180 }] as const

// Initialize dimensions on mount
onMounted(async () => {
  await updateDimensionsAndRectangles(content.value)
})

/**
 * Toggle visibility with animation tracking
 */
const toggleVisibility = (visible: boolean) => {
  isAnimating.value = true
  isVisible.value = visible
  setTimeout(() => {
    isAnimating.value = false
  }, BORDERS.ANIMATION_DURATION * 1000)
}

defineExpose({
  /**
   * Show the borders (appear animation)
   */
  appear: () => toggleVisibility(true),
  /**
   * Hide the borders (disappear animation)
   */
  disappear: () => toggleVisibility(false),
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
        'transition-duration': `${transitionDuration}s`,
      }"
      :class="[
        'top-1/2 -translate-y-1/2 absolute pointer-events-none transition-[stroke-dashoffset]',
        `drop-shadow-[0_0_2px_#ffb100]`,
      ]"
    >
      <rect
        v-for="(config, index) in rectConfigs"
        :key="index"
        :x="-BORDERS.RADIUS"
        :y="BORDERS.THICKNESS / 2"
        :width="animatedBorderWidth - BORDERS.THICKNESS"
        :height="animatedBorderHeight - BORDERS.THICKNESS"
        :rx="BORDERS.RADIUS"
        stroke="#ffb100"
        :stroke-width="BORDERS.THICKNESS"
        stroke-linecap="round"
        fill="none"
        :class="config.rotation === 180 ? 'origin-center rotate-180' : ''"
      />
    </svg>
  </div>
</template>
