<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from 'vue'

// Emits
const emit = defineEmits(['typing-complete', 'removing-complete'])

// Props
const props = defineProps({
  text: {
    type: String,
    required: true,
    default: 'TEXT',
  },
  textWritingSpeed: {
    type: Number,
    default: 100,
  },
})

// State
const displayedText = ref('')
const cursorVisible = ref(false)
const cursorBlinking = ref(false)
let typingTimeout: number | null = null
let removingTimeout: number | null = null

/**
 * Text typing animation
 */
const playTypingAnimation = () => {
  if (displayedText.value.length < props.text.length) {
    displayedText.value += props.text.charAt(displayedText.value.length)
    typingTimeout = setTimeout(playTypingAnimation, props.textWritingSpeed)
  } else {
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
    removingTimeout = setTimeout(removeAllCharacters, props.textWritingSpeed)
  } else {
    emit('removing-complete')
  }
}

const removeLastCharacter = () => {
  displayedText.value = displayedText.value.slice(0, -1)
}

const showCursor = () => {
  cursorVisible.value = true
}

const hideCursor = () => {
  cursorVisible.value = false
}

const blinkCursor = () => {
  cursorBlinking.value = true
}

const stopBlinkCursor = () => {
  cursorBlinking.value = false
}

// Nettoyer les timeouts pour éviter les fuites de mémoire
onBeforeUnmount(() => {
  if (typingTimeout !== null) clearTimeout(typingTimeout)
  if (removingTimeout !== null) clearTimeout(removingTimeout)
})

defineExpose({
  showCursor,
  hideCursor,
  blinkCursor,
  stopBlinkCursor,
  playTypingAnimation,
  playRemovingAnimation,
})
</script>

<template>
  <p
    class="text font-bold text-[#1A1200] text-4xl"
    ref="textElement"
    :class="{
      'with-cursor': cursorVisible,
      blinking: cursorBlinking,
    }"
  >
    {{ displayedText }}
  </p>
</template>

<style scoped>
.text::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 0px;
  background-color: #1a1200;
  top: 50%;
  transform: translateY(-50%);
  transition: height 0.5s;
}

.text.with-cursor::after {
  height: 30px;
}

.text.with-cursor.blinking::after {
  animation: blinking 1s step-end infinite;
}

@keyframes blinking {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
