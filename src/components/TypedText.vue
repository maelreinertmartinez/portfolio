<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'

/**
 * The number of times the cursor blinks
 */
const BLINK_TIMES = 4

/**
 * The duration of each blink
 */
const BLINK_DURATION = 0.5

/**
 * The duration of the cursor showing animation
 */
const SHOW_CURSOR_DURATION = 0.5

/**
 * The duration of the cursor hiding animation
 */
const HIDE_CURSOR_DURATION = 0.5

/**
 * The time before the cursor hides when the text appears
 */
const CURSOR_HIDE_DELAY_APPEAR = 0.2

/**
 * The time before the cursor hides when the text disappears
 */
const CURSOR_HIDE_DELAY_DISAPPEAR = 0.1

/**
 * The ratio of the cursor width to the font size
 */
const CURSOR_WIDTH_RATIO = 0.1

interface Props {
  text?: string
  fontSize?: number
  charWritingSpeed?: number
}

const props = withDefaults(defineProps<Props>(), {
  text: 'TEXT',
  fontSize: 24,
  charWritingSpeed: 0.1,
})

/**
 * The displayed text
 */
const displayedText = ref('')

/**
 * The cursor reference
 */
const cursorRef = ref<HTMLSpanElement>()

/**
 * The active timeline animation
 */
const activeTimeline = ref<gsap.core.Timeline>()

/**
 * Get the delay for a given index, using firstItemDelay for the first item and defaultDelay for others
 * @param index - The current index
 * @param firstItemDelay - The delay to use for the first item (index 0)
 * @param defaultDelay - The delay to use for subsequent items
 * @returns The calculated delay
 */
const getDelayForIndex = (index: number, firstItemDelay: number, defaultDelay: number): number => {
  return index === 0 ? firstItemDelay : defaultDelay
}

/**
 * Add typing animation to the timeline
 * @param timeline
 */
const addTypingAnimation = (timeline: gsap.core.Timeline): void => {
  const textLength = props.text.length
  for (let i = 0; i < textLength; i++) {
    const delay = getDelayForIndex(i, BLINK_DURATION, props.charWritingSpeed)
    timeline.call(
      () => {
        displayedText.value += props.text.charAt(i)
      },
      [],
      `+=${delay}`,
    )
  }
}

/**
 * Add deleting animation to the timeline
 * @param timeline
 */
const addDeletingAnimation = (timeline: gsap.core.Timeline): void => {
  const currentLength = displayedText.value.length
  for (let i = 0; i < currentLength; i++) {
    const delay = getDelayForIndex(i, 0, props.charWritingSpeed)
    timeline.call(
      () => {
        displayedText.value = displayedText.value.slice(0, -1) // Remove the last character
      },
      [],
      `+=${delay}`,
    )
  }
}

/**
 * Add cursor blinking animation to the timeline
 * @param timeline
 */
const addCursorBlinkingAnimation = (timeline: gsap.core.Timeline): void => {
  if (!cursorRef.value) return
  for (let i = 0; i < BLINK_TIMES; i++) {
    const shouldShowCursor = i % 2 !== 0 // Show cursor on odd indexes
    const delay = getDelayForIndex(i, 0, BLINK_DURATION)
    timeline.set(
      cursorRef.value,
      {
        opacity: shouldShowCursor ? 1 : 0,
      },
      `+=${delay}`,
    )
  }
}

/**
 * Add cursor showing animation to the timeline
 * @param timeline
 */
const addCursorShowingAnimation = (timeline: gsap.core.Timeline): void => {
  if (!cursorRef.value) return
  timeline.to(cursorRef.value, {
    height: `${props.fontSize}px`,
    duration: SHOW_CURSOR_DURATION,
  })
}

/**
 * Add cursor hiding animation to the timeline
 * @param timeline
 */
const addCursorHidingAnimation = (timeline: gsap.core.Timeline, delay: number): void => {
  if (!cursorRef.value) return
  timeline.to(
    cursorRef.value,
    {
      height: 0,
      duration: HIDE_CURSOR_DURATION,
    },
    `+=${delay}`,
  )
}

/**
 * Play the appear timeline
 * @returns The timeline
 */
const playAppearTimeline = (): gsap.core.Timeline => {
  const tl = gsap.timeline()

  if (displayedText.value.length > 0) displayedText.value = ''

  addCursorBlinkingAnimation(tl)
  addTypingAnimation(tl)
  addCursorHidingAnimation(tl, CURSOR_HIDE_DELAY_APPEAR)

  return tl
}

/**
 * Play the disappear timeline
 * @returns The timeline
 */
const playDisappearTimeline = (): gsap.core.Timeline => {
  const tl = gsap.timeline()

  addCursorShowingAnimation(tl)
  addDeletingAnimation(tl)
  addCursorHidingAnimation(tl, CURSOR_HIDE_DELAY_DISAPPEAR)

  return tl
}

/**
 * Kill the active timeline
 */
const killActiveTimeline = (): void => {
  activeTimeline.value?.kill()
}

defineExpose({
  /**
   * Run the appear animation
   * @returns The timeline
   */
  appear: (): gsap.core.Timeline => {
    killActiveTimeline()
    activeTimeline.value = playAppearTimeline()
    return activeTimeline.value
  },
  /**
   * Run the disappear animation
   * @returns The timeline
   */
  disappear: (): gsap.core.Timeline => {
    killActiveTimeline()
    activeTimeline.value = playDisappearTimeline()
    return activeTimeline.value
  },
})

onBeforeUnmount(() => {
  killActiveTimeline()
})
</script>

<template>
  <p class="text font-bold text-primary-dark relative" :style="{ fontSize: `${fontSize}px` }">
    {{ displayedText }}
    <span
      ref="cursorRef"
      class="absolute top-1/2 -translate-y-1/2 bg-primary-dark opacity-0"
      :style="{
        height: `${fontSize}px`,
        width: `${fontSize * CURSOR_WIDTH_RATIO}px`,
      }"
    />
  </p>
</template>
