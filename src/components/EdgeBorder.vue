<script setup lang="ts">
import RoundedRectangle from '@/utils/RoundedRectangle'
import { ref, onMounted, computed } from 'vue'

interface Props {
  animationDuration: number
}

const props = withDefaults(defineProps<Props>(), {
  animationDuration: 0.7,
})

const content = ref<HTMLDivElement | null>(null)
const visible = ref(false)
const borderWidth = ref(16)
const borderHeight = ref(16)
const borderRectangle = ref<RoundedRectangle>(new RoundedRectangle(0, 0))
const transitionDuration = ref<number>(props.animationDuration)

const borderPerimeter = computed(
  () => borderRectangle.value.getPerimeter() - Math.PI * 16 - (borderHeight.value - 16),
)

const hiddenStrokeDashoffset = computed(() => `${borderPerimeter.value}px`)
const visibleStrokeDashoffset = computed(() => '0px')

const strokeDasharray = computed(() => `${borderPerimeter.value}px 10000px`)
const strokeDashoffset = computed(() =>
  visible.value ? visibleStrokeDashoffset.value : hiddenStrokeDashoffset.value,
)

const transitionTimingFunction = computed(() =>
  visible.value ? 'cubic-bezier(0,0,.4,1)' : 'cubic-bezier(.6,0,1,1)',
)

defineExpose({
  showBorder: () => {
    visible.value = true
  },
  hideBorder: () => {
    visible.value = false
  },
})

onMounted(() => {
  if (content.value) {
    borderWidth.value = content.value.offsetWidth + 16 + 120
    borderHeight.value = content.value.offsetHeight + 16 + 120
  }

  borderRectangle.value = new RoundedRectangle(borderWidth.value - 8, borderHeight.value - 8, 16)
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
      :class="[
        'left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 absolute pointer-events-none transition-stroke-dashoffset',
      ]"
    >
      <rect
        :x="8"
        :y="8"
        :width="borderWidth - 16"
        :height="borderHeight - 16"
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
