import {
  ipcRenderer
} from 'electron'

import path from 'path'
import createUID from '@common/js/createUID'


export default function () {

  if (!this.lve) {
    return
  }

  if (!this.actorDesign) {
    return
  }

  if (!this.actorPreviewStyle) {
    return
  }


  let design, actor
  let name

  design = this.createDesignFromId(this.actorDesign)

  if (!design) {
    return
  }

  name = ipcRenderer.sendSync('design-get-path', this.actorDesign)
  name = path.parse(name).name
  name = `${name}-${createUID()}`

  actor = this.createActorFromDesign(name, design)
  actor.css(this.actorPreviewStyle)

}