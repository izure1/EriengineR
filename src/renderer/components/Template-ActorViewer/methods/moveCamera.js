import {
  CAMERA
} from '../vars/name'


export default function (x, y) {

  if (!this.lve) {
    return
  }

  x = this.calcScale(x)
  y = this.calcScale(y)

  this.lve(CAMERA).css({
    left: `-=${x}`,
    bottom: `+=${y}`,
  })

}