import { describe, it, expect } from 'vitest'
import RoundedRectangle from '@/utils/RoundedRectangle'

describe('RoundedRectangle', () => {
  it('calculates perimeter for a rectangle without border radius', () => {
    const rect = new RoundedRectangle(100, 50)
    expect(rect.getPerimeter()).toBe(300)
  })

  it('calculates perimeter with border radius', () => {
    const rect = new RoundedRectangle(100, 50, 10)
    const cornersPerimeter = Math.PI * 10 * 2
    const segmentsPerimeter = (100 + 50) * 2 - 10 * 8
    expect(rect.getPerimeter()).toBeCloseTo(cornersPerimeter + segmentsPerimeter, 5)
  })

  it('defaults border radius to 0', () => {
    const rect = new RoundedRectangle(100, 50)
    expect(rect.borderRadius).toBe(0)
  })

  it('stores all dimensions correctly', () => {
    const rect = new RoundedRectangle(200, 100, 16)
    expect(rect.width).toBe(200)
    expect(rect.height).toBe(100)
    expect(rect.borderRadius).toBe(16)
  })

  it('returns the same perimeter as a standard rectangle when radius is 0', () => {
    const w = 300
    const h = 150
    const rect = new RoundedRectangle(w, h, 0)
    expect(rect.getPerimeter()).toBe(2 * (w + h))
  })
})
