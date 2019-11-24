export default function () {

  if (this.resizeObserver) {
    this.resizeObserver.disconnect(this.$el)
  }

}