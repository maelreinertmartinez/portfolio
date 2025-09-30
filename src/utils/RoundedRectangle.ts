export default class RoundedRectangle {
  width: number
  height: number
  borderRadius: number

  constructor(width: number, height: number, borderRadius: number = 0) {
    this.width = width
    this.height = height
    this.borderRadius = borderRadius
  }

  public getPerimeter() {
    const cornersPerimeter = this.getCornersPerimeter()
    const segmentsPerimeter = this.getSegmentsPerimeter()

    return cornersPerimeter + segmentsPerimeter
  }

  private getCornersPerimeter() {
    return Math.PI * this.borderRadius * 2
  }

  private getSegmentsPerimeter() {
    return (this.width + this.height) * 2 - this.borderRadius * 8
  }
}
