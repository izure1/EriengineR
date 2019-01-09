export default function (e) {

  let y
  let deno = 120

  y = e.wheelDeltaY
  y = y / deno / 20

  this.persp.value += y

  if (this.persp.value < this.persp.min) {
    this.persp.value = this.persp.min
  } else if (this.persp.value > this.persp.max) {
    this.persp.value = this.persp.max
  }

  e.preventDefault()

}