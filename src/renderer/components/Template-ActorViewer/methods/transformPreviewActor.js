import {
  PREVIEW_ACTOR
} from '../vars/name'


export default function (e) {

  if (!this.lve) {
    return
  }

  if (!this.lve.exists(PREVIEW_ACTOR)) {
    return
  }

  
  let actor
  
  actor = this.lve(PREVIEW_ACTOR).get()
  actor.ready(() => {

    let {
      x,
      y
    } = this.lve.getMouseCoords(e, true)


    let width, height, scale

    width = actor.width()
    height = actor.height()

    scale = this.actorDesignStyle.hasOwnProperty('scale') ? this.actorDesignStyle.scale : 1
    scale = this.calcScale(scale, true)


    let style = {
      ...this.actorDesignStyle,
      width,
      height,
      scale,
    }

    style = this.lve.calc(x, y, 100, style)
    actor.css(style)

    this.actorPreviewStyle = style

  })

}