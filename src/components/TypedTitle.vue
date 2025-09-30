<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import TextCursor from './TextCursor.vue'

// Emits
const emit = defineEmits(['typing-complete', 'removing-complete'])

// Props
interface Props {
  text: string
  textWritingSpeed: number
  cursorVisible: boolean
}

const props = defineProps<Props>()

// State
const displayedText = ref('')
const cursorBlinking = ref(true)
// const cursorBlinking = ref(false)
const typingTimeout = ref<number | null>(null)
const removingTimeout = ref<number | null>(null)
const resumingCursorBlinkingTimeout = ref<number | null>(null)
const resumingCursorBlinkingTimeoutAfterRemoving = ref<number | null>(null)

/**
 * Text typing animation
 */
const playTypingAnimation = () => {
  if (displayedText.value.length < props.text.length) {
    cursorBlinking.value = false
    displayedText.value += props.text.charAt(displayedText.value.length)
    typingTimeout.value = setTimeout(playTypingAnimation, props.textWritingSpeed)
  } else {
    resumingCursorBlinkingTimeout.value = setTimeout(
      () => (cursorBlinking.value = props.cursorVisible ? true : false),
      500,
    )
    emit('typing-complete')
  }
}

/**
 * Text removing animation
 */
const playRemovingAnimation = () => {
  removeAllCharacters()
}

const removeAllCharacters = () => {
  if (displayedText.value.length > 0) {
    removeLastCharacter()
    removingTimeout.value = setTimeout(removeAllCharacters, props.textWritingSpeed)
  } else {
    resumingCursorBlinkingTimeoutAfterRemoving.value = setTimeout(
      () => (cursorBlinking.value = props.cursorVisible ? true : false),
      500,
    )
    emit('removing-complete')
  }
}

const removeLastCharacter = () => {
  displayedText.value = displayedText.value.slice(0, -1)
}

// Nettoyer les timeouts pour éviter les fuites de mémoire
onBeforeUnmount(() => {
  if (typingTimeout.value !== null) clearTimeout(typingTimeout.value)
  if (removingTimeout.value !== null) clearTimeout(removingTimeout.value)
  if (resumingCursorBlinkingTimeout.value !== null)
    clearTimeout(resumingCursorBlinkingTimeout.value)
  if (resumingCursorBlinkingTimeoutAfterRemoving.value !== null)
    clearTimeout(resumingCursorBlinkingTimeoutAfterRemoving.value)
})

defineExpose({
  playTypingAnimation,
  playRemovingAnimation,
})
</script>

<template>
  <p class="text font-bold text-[#1A1200] text-4xl relative" ref="textElement">
    {{ displayedText }}
    <TextCursor
      class="absolute left-[calc(100%+1px)] top-[50%] -translate-y-[50%]"
      :visible="cursorVisible"
      :blinking="cursorBlinking"
      :height="30"
    />
  </p>
</template>
