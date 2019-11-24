import {
  ipcRenderer
} from 'electron'

import {
  PREVIEW_ACTOR
} from '../vars/name'


export default function () {

  this.removePreviewActor()

  if (!this.$store.state.actorDesign) {
    return
  }

  if (this.$store.state.actorDesign !== this.actorDesign) {
    this.actorDesign = this.$store.state.actorDesign
  }


  let design, actor

  // create design object
  design = this.createDesignFromId(this.actorDesign)

  if (!design) {
    return
  }

  // create preview actor to LveJS world
  actor = this.createActorFromDesign(PREVIEW_ACTOR, design)

  this.actorDesignStyle = design.status.style || {}

}