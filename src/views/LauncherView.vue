<script setup lang="ts">
import LauncherBorders from '../components/LauncherBorders.vue'
import { onMounted, ref } from 'vue'
import TypedTitle from '../components/TypedText.vue'
import { usePageStore } from '../stores/page'

const button = ref<HTMLButtonElement | null>(null)
const launcherBorders = ref<typeof LauncherBorders | null>(null)
const typedTitle = ref<typeof TypedTitle | null>(null)
const isButtonInterractable = ref(false)
const hover = ref(false)
const isBorderVisible = ref(false)
const pageStore = usePageStore()

const showBorders = () => (isBorderVisible.value = true)
const hideBorders = () => (isBorderVisible.value = false)

const launchButtonHover = () => {
  hover.value = true
  if (!launcherBorders.value || !isButtonInterractable.value) return
  showBorders()
}

const launchButtonExit = () => {
  hover.value = false
  if (!launcherBorders.value || !isButtonInterractable.value) return
  hideBorders()
}

/**
 * Launch button click handler
 */
const launch = () => {
  if (button.value) {
    button.value.classList.add('pointer-events-none')
  }

  hideBorders()
  playRemovingAnimation()
}

const playTypingAnimation = () => {
  if (!launcherBorders.value) return
  typedTitle.value
    ?.appear()
    .then(() => launcherBorders.value?.updateDimensionsAndRectangles())
    .then(() => {
      isButtonInterractable.value = true
      if (hover.value) isBorderVisible.value = true
    })
}

const playRemovingAnimation = () => {
  if (!launcherBorders.value) return
  typedTitle.value?.disappear().then(() => (pageStore.name = 'home'))
}

onMounted(() => {
  playTypingAnimation()
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
        @mouseout="launchButtonExit"
      >
        <TypedTitle ref="typedTitle" text="LAUNCH" :fontSize="36" />
      </button>
    </LauncherBorders>
  </div>
</template>
