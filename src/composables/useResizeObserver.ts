import { ref, onMounted, onUnmounted, nextTick, type Ref } from 'vue'
import { BORDERS } from '@/constants/constants'

/**
 * Composable for managing ResizeObserver with debouncing
 */
export function useResizeObserver(
  element: Ref<HTMLDivElement | null>,
  onResize: (content: HTMLDivElement | null, skipTransitionReset: boolean) => void | Promise<void>,
  isAnimating: Ref<boolean>,
) {
  const resizeObserver = ref<ResizeObserver | null>(null)
  const resizeObserverTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
  const IS_CLIENT = typeof window !== 'undefined'

  /**
   * Debounced handler for ResizeObserver updates
   * Skips transition reset if an animation is in progress
   */
  function handleResizeObserverUpdate() {
    if (resizeObserverTimeout.value) {
      clearTimeout(resizeObserverTimeout.value)
    }
    resizeObserverTimeout.value = setTimeout(() => {
      onResize(element.value, isAnimating.value)
    }, BORDERS.RESIZE_OBSERVER_DEBOUNCE_DELAY)
  }

  onMounted(async () => {
    if (IS_CLIENT) {
      await nextTick()
      if (element.value && 'ResizeObserver' in window) {
        resizeObserver.value = new ResizeObserver(() => {
          handleResizeObserverUpdate()
        })
        resizeObserver.value.observe(element.value)
      }
    }
  })

  onUnmounted(() => {
    if (IS_CLIENT) {
      if (resizeObserverTimeout.value) {
        clearTimeout(resizeObserverTimeout.value)
      }
      if (resizeObserver.value) {
        resizeObserver.value.disconnect()
      }
    }
  })
}
