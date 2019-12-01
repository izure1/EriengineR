import {
  CAMERA
} from '../vars/name'


export default function () {

  if (!this.lve) return

  this.lve(CAMERA).css('perspective', this.cameraPersp)

}