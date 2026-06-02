import { computed, nextTick, type Ref } from 'vue'
import RoundedRectangle from '@/utils/RoundedRectangle'
import { BORDERS } from '@/constants/constants'

/**
 * Composable for calculating border dimensions and stroke properties
 */
export function useBorderDimensions(
  contentWidth: Ref<number>,
  contentHeight: Ref<number>,
  windowWidth: Ref<number>,
  isVisible: Ref<boolean>,
  transitionDuration: Ref<number>,
) {
  /**
   * Compute the animated border width.
   * Formula: borderThickness * multiplier + paddingX + (contentWidth + windowWidth) / 2 + borderRadius
   * This creates a border that extends from the content to the edge of the screen.
   */
  const animatedBorderWidth = computed(() => {
    return (
      BORDERS.THICKNESS * BORDERS.BORDER_WIDTH_MULTIPLIER +
      BORDERS.PADDING_X +
      (contentWidth.value + windowWidth.value) / 2 +
      BORDERS.RADIUS
    )
  })

  const animatedBorderHeight = computed(
    () => contentHeight.value + BORDERS.THICKNESS * 2 + BORDERS.PADDING_Y * 2,
  )

  const rectangle = computed(
    () =>
      new RoundedRectangle(animatedBorderWidth.value, animatedBorderHeight.value, BORDERS.RADIUS),
  )

  const contentRectangle = computed(
    () =>
      new RoundedRectangle(
        contentWidth.value + BORDERS.PADDING_X * 2,
        contentHeight.value + BORDERS.PADDING_Y * 2,
        BORDERS.RADIUS,
      ),
  )

  const rectPerimeter = computed(() => rectangle.value.getPerimeter() + 4 * BORDERS.THICKNESS)
  const contentPerimeter = computed(
    () => contentRectangle.value.getPerimeter() + 4 * BORDERS.THICKNESS,
  )

  const hiddenStrokeDashoffset = computed(() => `${contentPerimeter.value / 2}px`)
  const visibleStrokeDashoffset = computed(
    () => `-${rectPerimeter.value / 2 - contentPerimeter.value / 2}px`,
  )

  const strokeDasharray = computed(
    () => `${contentPerimeter.value / 2}px ${BORDERS.STROKE_DASHARRAY_LARGE_VALUE}px`,
  )

  const strokeDashoffset = computed(() =>
    isVisible.value ? visibleStrokeDashoffset.value : hiddenStrokeDashoffset.value,
  )

  const transitionTimingFunction = computed(() =>
    isVisible.value ? 'cubic-bezier(0,0,.4,1)' : 'cubic-bezier(.6,0,1,1)',
  )

  /**
   * Update content size (slot) dimensions
   */
  function updateContentDimensions(content: HTMLDivElement | null) {
    if (content) {
      contentWidth.value = content.offsetWidth
      contentHeight.value = content.offsetHeight
    }
  }

  /**
   * Main update function with well-separated responsibilities
   * Resets transition duration, updates dimensions, then restores animation duration
   */
  async function updateDimensionsAndRectangles(
    content: HTMLDivElement | null,
    skipTransitionReset = false,
  ) {
    if (!skipTransitionReset) {
      transitionDuration.value = 0
    }
    updateContentDimensions(content)
    await nextTick()
    if (!skipTransitionReset) {
      requestAnimationFrame(() => {
        transitionDuration.value = BORDERS.ANIMATION_DURATION
      })
    }
  }

  return {
    animatedBorderWidth,
    animatedBorderHeight,
    strokeDasharray,
    strokeDashoffset,
    transitionTimingFunction,
    updateDimensionsAndRectangles,
  }
}
