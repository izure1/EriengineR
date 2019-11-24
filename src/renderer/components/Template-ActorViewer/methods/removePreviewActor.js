import {
  PREVIEW_ACTOR
} from '../vars/name'


export default function () {

  if (!this.lve) {
    return
  }

  this.lve(PREVIEW_ACTOR).remove()

}