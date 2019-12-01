import {
  CAMERA
} from '../vars/name'


export default function () {

  if (!this.lve) return

  this.lve(CAMERA).css({
    left: this.cameraLeft,
    bottom: this.cameraBottom,
  })

}