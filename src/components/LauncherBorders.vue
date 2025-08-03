<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'

const props = defineProps({
  borderRadius: {
    type: Number,
    default: 16,
  },
  borderThickness: {
    type: Number,
    default: 8,
  },
  paddingX: {
    type: Number,
    default: 16,
  },
  paddingY: {
    type: Number,
    default: 16,
  },
  borderColor: {
    type: String,
    default: '#ffb100',
  },
})

// Animation state
const windowWidth = ref(0)
const contentWidth = ref(0)
const contentHeight = ref(0)
const strokeDasharray = ref('0px 10000px')
const strokeDashoffset = ref('0px')
const fromStrokeDashoffset = ref('')
const toStrokeDashoffset = ref('')
const transitionTimingFunction = ref('ease-out')

// DOM refs
const fromRightBorder = ref<SVGRectElement | null>(null)
const fromLeftBorder = ref<SVGRectElement | null>(null)
const content = ref<HTMLDivElement | null>(null)
const svg = ref<SVGSVGElement | null>(null)

// Computed properties for reactive dimensions
const animatedBorderWidth = computed(
  () =>
    props.borderThickness * 1.5 +
    props.paddingX +
    (contentWidth.value + windowWidth.value) / 2 +
    props.borderRadius,
)

const animatedBorderHeight = computed(
  () => contentHeight.value + props.borderThickness * 2 + props.paddingY * 2,
)

const perimeters = computed(() => {
  // TODO: export to external file all calculations
  const coin = Math.PI * props.borderRadius * 2

  const bigSegments =
    2 * animatedBorderWidth.value +
    2 * animatedBorderHeight.value -
    8 * props.borderRadius -
    props.borderThickness * 4

  const smallSegments =
    2 * contentWidth.value +
    2 * contentHeight.value +
    props.paddingX * 4 +
    props.paddingY * 4 -
    8 * props.borderRadius +
    4 * props.borderThickness

  const bigPerimetre = bigSegments + coin
  const smallPerimetre = smallSegments + coin

  return { bigPerimetre, smallPerimetre }
})

/**
 * Update the animated border dimensions and properties
 */
const updateAnimatedBorder = () => {
  windowWidth.value = window.innerWidth
  // Get dimensions
  if (content.value) {
    contentWidth.value = content.value.offsetWidth
    contentHeight.value = content.value.offsetHeight
  }

  // Set SVG properties
  setPositions()
  setStrokeProperties()
}

/**
 * Set the positions of the SVG borders
 */
const setPositions = () => {
  if (!fromRightBorder.value || !fromLeftBorder.value) return

  fromRightBorder.value.setAttribute('x', `${-props.borderRadius}px`)
  fromLeftBorder.value.setAttribute('x', `${-props.borderRadius}px`)
}

/**
 * Set the stroke properties for the SVG animations
 */
const setStrokeProperties = () => {
  if (!svg.value) return

  const { bigPerimetre, smallPerimetre } = perimeters.value

  svg.value.style.transitionDuration = '0s'
  strokeDasharray.value = `${smallPerimetre / 2}px 10000px`
  fromStrokeDashoffset.value = `${smallPerimetre / 2}px`
  toStrokeDashoffset.value = `-${bigPerimetre / 2 - smallPerimetre / 2}px`
  strokeDashoffset.value = fromStrokeDashoffset.value

  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    if (svg.value) {
      svg.value.style.transitionDuration = '0.7s'
    }
  })
}

// Animation controllers
const appear = () => {
  transitionTimingFunction.value = 'cubic-bezier(0,0,.4,1)'
  strokeDashoffset.value = toStrokeDashoffset.value
}

const disappear = () => {
  transitionTimingFunction.value = 'cubic-bezier(.6,0,1,1)'
  strokeDashoffset.value = fromStrokeDashoffset.value
}

// Handle window resize
const handleResize = () => {
  updateAnimatedBorder()
}

onMounted(() => {
  updateAnimatedBorder()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

defineExpose({
  appear,
  disappear,
  updateAnimatedBorder,
})
</script>

<template>
  <div>
    <div ref="content" class="left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 absolute">
      <slot />
    </div>
    <svg
      :width="windowWidth"
      :height="animatedBorderHeight"
      :viewBox="`0 0 ${windowWidth} ${animatedBorderHeight}`"
      :style="{
        'stroke-dasharray': strokeDasharray,
        'stroke-dashoffset': strokeDashoffset,
        'transition-timing-function': transitionTimingFunction,
      }"
      :class="[
        'top-1/2 -translate-y-1/2 absolute pointer-events-none drop-shadow-[0_0_2px_#ffb100] transition-stroke-dashoffset',
      ]"
      ref="svg"
    >
      <rect
        :y="props.borderThickness / 2"
        :width="animatedBorderWidth - props.borderThickness"
        :height="animatedBorderHeight - props.borderThickness"
        :rx="props.borderRadius"
        :stroke="props.borderColor"
        :stroke-width="props.borderThickness"
        stroke-linecap="round"
        fill="none"
        ref="fromRightBorder"
        class="origin-center rotate-180"
      />
      <rect
        :y="props.borderThickness / 2"
        :width="animatedBorderWidth - props.borderThickness"
        :height="animatedBorderHeight - props.borderThickness"
        :rx="props.borderRadius"
        :stroke="props.borderColor"
        :stroke-width="props.borderThickness"
        stroke-linecap="round"
        fill="none"
        ref="fromLeftBorder"
      />
    </svg>
  </div>
</template>
