export default function (e) {

  let x, y, z
  let d, sd

  d = this.cameraMoveGap
  sd = d / 5

  x = '+=0'
  y = '+=0'
  z = '+=0'

  switch (e.keyCode) {

    // w
    case 87:
      y = `+=${d}`
      break
      // s
    case 83:
      y = `-=${d}`
      break
      // a
    case 65:
      x = `-=${d}`
      break
      // d
    case 68:
      x = `+=${d}`
      break

      // space
    case 32:
      z = `+=${sd}`
      break

      // l-ctrl
    case 17:
      z = `-=${sd}`
      break

    default:
      return

  }

  this.lve('__camera__').animate({
    left: x,
    bottom: y,
    perspective: z
  }, 1000, 'easeOutExpo')

}