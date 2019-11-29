import {
  ipcRenderer
} from 'electron'

import path from 'path'

import createUID from '@common/js/createUID'
import Actor from '@common/js/Actor'


export default function (e, dataTransfer) {

  if (!this.lve) {
    return
  }

  let actorDesign = dataTransfer.getData('text/actor-design-id')
  let actorPreviewStyle = dataTransfer.getData('object/actor-preview-style')

  if (!actorDesign) {
    return
  }

  if (!actorPreviewStyle) {
    return
  }

  let design, actor
  let name

  design = this.createDesignFromId(actorDesign)

  if (!design) {
    return
  }

  name = ipcRenderer.sendSync('design-get-path', actorDesign)
  name = path.parse(name).name
  name = `${name}-${createUID()}`


  actor = new Actor

  actor.name = name
  actor.design = actorDesign
  actor.position.x = actorPreviewStyle.left
  actor.position.y = actorPreviewStyle.bottom
  actor.position.z = actorPreviewStyle.perspective


  let filepath
  
  filepath = path.join(this.path, name)
  filepath += '.esactor'

  ipcRenderer.sendSync('actor-create', filepath, actor)

}