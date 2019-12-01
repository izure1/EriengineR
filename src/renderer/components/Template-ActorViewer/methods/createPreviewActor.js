import {
  ipcRenderer
} from 'electron'

import {
  PREVIEW_ACTOR
} from '../vars/name'


export default function (e, dataTransfer) {

  this.removePreviewActor()

  let actorDesign = dataTransfer.getData('text/actor-design-id')
  if (!actorDesign) return

  // create design object
  let design = this.createDesignFromId(actorDesign)
  if (!design) return

  // create preview actor to LveJS world
  this.createActorFromDesign(PREVIEW_ACTOR, design)
  dataTransfer.setData('object/actor-design-style', design.component.style || {})

}