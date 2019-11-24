export default function () {

  let {
    offsetWidth,
    offsetHeight,
  } = this.$el

  this.canvasWidth = offsetWidth
  this.canvasHeight = offsetHeight

}