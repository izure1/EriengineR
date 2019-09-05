export default function (e) {

  let x, y
  let el, o
  let sx, sy

  el = e.currentTarget
  o = el.getBoundingClientRect()
  x = e.clientX
  y = e.clientY
  x -= o.x
  y -= o.y

  // Modify element scale
  sx = o.width / el.offsetWidth
  sy = o.height / el.offsetHeight

  sx = 1 / sx
  sy = 1 / sy

  x *= sx
  y *= sy

  x += el.scrollLeft
  y += el.scrollTop

  return {
    x,
    y
  }

}