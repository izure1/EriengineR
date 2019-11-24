export default function () {
  this.resizeObserver = new ResizeObserver(this.setCanvasResize).observe(this.$el)
}