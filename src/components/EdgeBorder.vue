<script setup lang="ts">
import RoundedRectangle from '@/utils/RoundedRectangle'
import { ref, computed } from 'vue'
import { useResizeObserver } from '@/composables/useResizeObserver'

interface Props {
  animationDuration: number
}

const props = withDefaults(defineProps<Props>(), {
  animationDuration: 0.7,
})

const visible = ref(false)
const borderWidth = computed(() => contentWidth.value + 16 + 120)
const borderHeight = computed(() => contentHeight.value + 16 + 120)
const borderRectangle = computed(
  () => new RoundedRectangle(borderWidth.value, borderHeight.value - 8, 16),
)
const transitionDuration = ref<number>(props.animationDuration)

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

const borderPerimeter = computed(
  () => borderRectangle.value.getPerimeter() - Math.PI * 16 - (borderHeight.value - 16),
)

const hiddenStrokeDashoffset = computed(() => `${borderPerimeter.value}px`)
const visibleStrokeDashoffset = computed(() => `-4px`)

const strokeDasharray = computed(() => `${borderPerimeter.value}px 10000px`)
const strokeDashoffset = computed(() =>
  visible.value ? visibleStrokeDashoffset.value : hiddenStrokeDashoffset.value,
)

const transitionTimingFunction = computed(() =>
  visible.value ? 'cubic-bezier(0,0,.4,1)' : 'cubic-bezier(.6,0,1,1)',
)

useResizeObserver(
  content,
  (contentElement) => {
    if (contentElement) {
      contentWidth.value = contentElement.offsetWidth
      contentHeight.value = contentElement.offsetHeight
    }
  },
  ref(false),
)

defineExpose({
  showBorder: () => {
    visible.value = true
  },
  hideBorder: () => {
    visible.value = false
  },
})
</script>

<template>
  <div
    :style="{
      width: borderWidth + 'px',
      height: borderHeight + 'px',
    }"
  >
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
      :width="borderWidth"
      :height="borderHeight"
      :viewBox="`0 0 ${borderWidth} ${borderHeight}`"
      aria-hidden="true"
      role="presentation"
      :style="{
        'stroke-dasharray': strokeDasharray,
        'stroke-dashoffset': strokeDashoffset,
        'transition-timing-function': transitionTimingFunction,
        'transition-duration': `${transitionDuration}s`,
      }"
      class="left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 absolute pointer-events-none transition-[stroke-dashoffset]"
    >
      <rect
        :x="4"
        :y="4"
        :width="borderWidth - 8"
        :height="borderHeight - 8"
        :rx="16"
        :stroke="'#ffb100'"
        :stroke-width="8"
        stroke-linecap="round"
        fill="none"
        class="origin-center rotate-180"
      />
    </svg>
  </div>
</template>
