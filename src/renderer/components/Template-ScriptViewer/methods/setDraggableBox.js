export default function (script) {

  let origin

  this.jsPlumb.draggable(this.getScriptId(script.id), {
    grid: [60, 60],
    stop: e => {
      origin = this.getOriginScript(script.id)
      origin.position.x = e.pos[0]
      origin.position.y = e.pos[1]
      this.saveScript(origin)
    }
  })

}