<script setup lang="ts">
import LauncherBorders from '../components/LauncherBorders.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import TypedTitle from '../components/TypedTitle.vue'
import { usePageStore } from '../stores/page'

const button = ref<HTMLButtonElement | null>(null)
const launcherBorders = ref<typeof LauncherBorders | null>(null)
const typedTitle = ref<typeof TypedTitle | null>(null)
const isButtonInterractable = ref(false)
const hover = ref(false)
const pageStore = usePageStore()

const launchButtonHover = () => {
  hover.value = true
  if (!launcherBorders.value || !isButtonInterractable.value) return
  launcherBorders.value.appear()
}

const launchButtonLeave = () => {
  hover.value = false
  if (!launcherBorders.value || !isButtonInterractable.value) return
  launcherBorders.value.disappear()
}

/**
 * Launch button click handler
 */
const launch = () => {
  if (!button.value) return

  button.value.classList.add('pointer-events-none')
  playLeaveAnimation()
  playRemovingAnimation()
  window.removeEventListener('resize', () => launcherBorders.value?.updateAnimatedBorder())
}

const playLeaveAnimation = () => {
  if (!launcherBorders.value) return
  launcherBorders.value.disappear()
}

const playRemovingAnimation = () => {
  if (!launcherBorders.value) return
  typedTitle.value?.showCursor()

  setTimeout(() => typedTitle.value?.playRemovingAnimation(), 600)
}

const playArrivalAnimation = () => {
  if (!launcherBorders.value) return
  typedTitle.value?.showCursor()
  typedTitle.value?.blinkCursor()
  setTimeout(() => typedTitle.value?.stopBlinkCursor(), 2000)
  setTimeout(() => typedTitle.value?.playTypingAnimation(), 2000)
}

/**
 * Handler for when typing animation is complete
 */
const onTypingComplete = () => {
  setTimeout(() => {
    typedTitle.value?.hideCursor()
    launcherBorders.value?.updateAnimatedBorder()
    window.addEventListener('resize', () => launcherBorders.value?.updateAnimatedBorder())
    setTimeout(() => (isButtonInterractable.value = true), 700)
    setTimeout(() => {
      if (hover.value) {
        launcherBorders.value?.appear()
      }
    }, 700)
  }, 100)
}

const onRemovingComplete = () => {
  if (!launcherBorders.value) return
  typedTitle.value?.hideCursor()
  setTimeout(() => (pageStore.name = 'work-in-progress'), 500)
}

onMounted(() => {
  playArrivalAnimation()
})

onUnmounted(() => {
  window.removeEventListener('resize', () => launcherBorders.value?.updateAnimatedBorder())
})
</script>

<template>
  <div class="h-full w-full">
    <LauncherBorders ref="launcherBorders">
      <button
        ref="button"
        @click="launch"
        @mouseover="launchButtonHover"
        @mouseout="launchButtonLeave"
      >
        <TypedTitle
          text="LAUNCH"
          ref="typedTitle"
          @typing-complete="onTypingComplete"
          @removing-complete="onRemovingComplete"
        />
      </button>
    </LauncherBorders>
  </div>
</template>
