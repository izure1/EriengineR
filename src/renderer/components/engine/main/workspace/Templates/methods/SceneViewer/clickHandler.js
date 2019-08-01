export default function (e) {

  e = this.lve.getMouseCoords(e)
  e = this.lve.calc(e.x, e.y, 100, {
    width: 30,
    height: 30,
    color: '#ef007c',
    rotate: Math.random() * 360
  })

  this.lve(performance.now()).create({
    type: 'square'
  }).css(e).attr('physics', 'dynamic')

}