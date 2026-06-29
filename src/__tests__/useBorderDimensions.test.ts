import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useBorderDimensions } from '@/composables/useBorderDimensions'
import { BORDERS } from '@/constants/constants'

function makeComposable(overrides: {
  contentWidth?: number
  contentHeight?: number
  windowWidth?: number
  isVisible?: boolean
  transitionDuration?: number
} = {}) {
  const contentWidth = ref(overrides.contentWidth ?? 200)
  const contentHeight = ref(overrides.contentHeight ?? 100)
  const windowWidth = ref(overrides.windowWidth ?? 1200)
  const isVisible = ref(overrides.isVisible ?? false)
  const transitionDuration = ref(overrides.transitionDuration ?? BORDERS.ANIMATION_DURATION)
  return useBorderDimensions(contentWidth, contentHeight, windowWidth, isVisible, transitionDuration)
}

describe('useBorderDimensions', () => {
  it('calculates animatedBorderHeight from content height', () => {
    const { animatedBorderHeight } = makeComposable({ contentHeight: 100 })
    expect(animatedBorderHeight.value).toBe(100 + BORDERS.THICKNESS * 2 + BORDERS.PADDING_Y * 2)
  })

  it('calculates animatedBorderWidth from content and window width', () => {
    const { animatedBorderWidth } = makeComposable({ contentWidth: 200, windowWidth: 1200 })
    const expected =
      BORDERS.THICKNESS * BORDERS.BORDER_WIDTH_MULTIPLIER +
      BORDERS.PADDING_X +
      (200 + 1200) / 2 +
      BORDERS.RADIUS
    expect(animatedBorderWidth.value).toBe(expected)
  })

  it('returns different strokeDashoffset when visible vs hidden', () => {
    const isVisible = ref(false)
    const contentWidth = ref(200)
    const contentHeight = ref(100)
    const windowWidth = ref(1200)
    const transitionDuration = ref(BORDERS.ANIMATION_DURATION)

    const { strokeDashoffset } = useBorderDimensions(
      contentWidth,
      contentHeight,
      windowWidth,
      isVisible,
      transitionDuration,
    )

    const hiddenOffset = strokeDashoffset.value
    isVisible.value = true
    expect(strokeDashoffset.value).not.toBe(hiddenOffset)
  })

  it('uses ease-in timing when hiding, ease-out when showing', () => {
    const isVisible = ref(false)
    const contentWidth = ref(200)
    const contentHeight = ref(100)
    const windowWidth = ref(1200)
    const transitionDuration = ref(BORDERS.ANIMATION_DURATION)

    const { transitionTimingFunction } = useBorderDimensions(
      contentWidth,
      contentHeight,
      windowWidth,
      isVisible,
      transitionDuration,
    )

    const hiddenTiming = transitionTimingFunction.value
    isVisible.value = true
    expect(transitionTimingFunction.value).not.toBe(hiddenTiming)
  })
})
