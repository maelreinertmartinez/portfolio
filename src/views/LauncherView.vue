<script setup lang="ts">
import LauncherBorders from '../components/LauncherBorders.vue'
import { onMounted, ref } from 'vue'
import TypedTitle from '../components/TypedTitle.vue'
import { usePageStore } from '../stores/page'

const button = ref<HTMLButtonElement | null>(null)
const launcherBorders = ref<typeof LauncherBorders | null>(null)
const typedTitle = ref<typeof TypedTitle | null>(null)
const isButtonInterractable = ref(false)
const hover = ref(false)
const pageStore = usePageStore()
const isBorderVisible = ref(false)
const cursorVisible = ref(true)

const launchButtonHover = () => {
  hover.value = true
  if (!launcherBorders.value || !isButtonInterractable.value) return
  isBorderVisible.value = true
}

const launchButtonLeave = () => {
  hover.value = false
  if (!launcherBorders.value || !isButtonInterractable.value) return
  isBorderVisible.value = false
}

/**
 * Launch button click handler
 */
const launch = () => {
  if (!button.value) return

  button.value.classList.add('pointer-events-none')
  playLeaveAnimation()
  playRemovingAnimation()
}

const playLeaveAnimation = () => {
  if (!launcherBorders.value) return
  isBorderVisible.value = false
}

const playRemovingAnimation = () => {
  if (!launcherBorders.value) return
  cursorVisible.value = true

  setTimeout(() => typedTitle.value?.playRemovingAnimation(), 600)
}

const playArrivalAnimation = () => {
  if (!launcherBorders.value) return
  cursorVisible.value = true
  setTimeout(() => typedTitle.value?.playTypingAnimation(), 2000)
}

/**
 * Handler for when typing animation is complete
 */
const onTypingComplete = () => {
  setTimeout(() => {
    cursorVisible.value = false
    launcherBorders.value?.updateDimensionsAndRectangles()
    setTimeout(() => (isButtonInterractable.value = true), 700)
    setTimeout(() => {
      if (hover.value) {
        isBorderVisible.value = true
      }
    }, 700)
  }, 100)
}

const onRemovingComplete = () => {
  if (!launcherBorders.value) return
  cursorVisible.value = false
  setTimeout(() => (pageStore.name = 'work-in-progress'), 500)
}

onMounted(() => {
  playArrivalAnimation()
})
</script>

<template>
  <div class="h-full w-full">
    <LauncherBorders
      ref="launcherBorders"
      :visible="isBorderVisible"
      :border-radius="16"
      :border-thickness="8"
      :padding-x="16"
      :padding-y="16"
      :border-color="'#ffb100'"
      :animation-duration="0.7"
    >
      <button
        ref="button"
        class="flex justify-center items-center"
        @click="launch"
        @mouseover="launchButtonHover"
        @mouseout="launchButtonLeave"
      >
        <TypedTitle
          text="LAUNCH"
          :textWritingSpeed="100"
          :cursorVisible="cursorVisible"
          ref="typedTitle"
          @typingComplete="onTypingComplete"
          @removingComplete="onRemovingComplete"
        />
      </button>
    </LauncherBorders>
  </div>
</template>
