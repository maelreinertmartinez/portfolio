import { ref, onMounted, onUnmounted } from 'vue'
import { BORDERS } from '@/constants/constants'

/**
 * Composable for managing window resize events with debouncing
 */
export function useWindowResize() {
  const windowWidth = ref(0)
  const resizeTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
  const IS_CLIENT = typeof window !== 'undefined'

  if (IS_CLIENT) {
    windowWidth.value = window.innerWidth
  }

  /**
   * Debounced update of window width on resize event
   */
  function updateWindowWidth() {
    if (resizeTimeout.value) {
      clearTimeout(resizeTimeout.value)
    }
    resizeTimeout.value = setTimeout(() => {
      windowWidth.value = window.innerWidth
    }, BORDERS.RESIZE_DEBOUNCE_DELAY)
  }

  onMounted(() => {
    if (IS_CLIENT) {
      window.addEventListener('resize', updateWindowWidth)
    }
  })

  onUnmounted(() => {
    if (IS_CLIENT) {
      window.removeEventListener('resize', updateWindowWidth)
      if (resizeTimeout.value) {
        clearTimeout(resizeTimeout.value)
      }
    }
  })

  return { windowWidth }
}
