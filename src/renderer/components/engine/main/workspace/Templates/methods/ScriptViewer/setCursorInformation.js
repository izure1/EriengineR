import getMouseOffset from '@common/js/getMouseOffset'


export default function (e) {

  let o = getMouseOffset(e)

  this.connection.x = o.x
  this.connection.y = o.y

  this.jsPlumb.repaintEverything()

}