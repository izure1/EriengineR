import {
  PREVIEW_ACTOR
} from '../vars/name'


export default function (e, dataTransfer) {

  if (!this.lve) {
    return
  }

  if (!this.lve.exists(PREVIEW_ACTOR)) {
    return
  }


  let actor

  actor = this.lve(PREVIEW_ACTOR).get()
  actor.ready(() => {

    if (!dataTransfer.getData('object/actor-preview-size')) {

      let width = actor.width()
      let height = actor.height()

      dataTransfer.setData('object/actor-preview-size', {
        width,
        height,
      })

    }

    let {
      x,
      y
    } = this.lve.getMouseCoords(e, true)


    let scale
    let actorDesignStyle
    let {
      width,
      height
    } = dataTransfer.getData('object/actor-preview-size')

    actorDesignStyle = dataTransfer.getData('object/actor-design-style')

    scale = actorDesignStyle.hasOwnProperty('scale') ? actorDesignStyle.scale : 1
    scale = this.calcScale(scale, true)


    let style = {
      ...actorDesignStyle,
      width,
      height,
      scale,
    }

    style = this.lve.calc(x, y, 100, style)
    actor.css(style)

    dataTransfer.setData('object/actor-preview-style', style)

  })

}