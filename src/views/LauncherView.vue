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
const pageStore = usePageStore()

const showBorders = () => launcherBorders.value?.appear()
const hideBorders = () => launcherBorders.value?.disappear()

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
  typedTitle.value?.appear().then(() => {
    isButtonInterractable.value = true
    if (hover.value) launcherBorders.value?.appear()
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
    <LauncherBorders ref="launcherBorders">
      <button
        ref="button"
        class="flex justify-center items-center"
        :disabled="!isButtonInterractable"
        @click="launch"
        @mouseover="launchButtonHover"
        @mouseout="launchButtonExit"
      >
        <TypedTitle ref="typedTitle" text="LAUNCH" class="font-bold" :fontSize="36" />
      </button>
    </LauncherBorders>
  </div>
</template>
