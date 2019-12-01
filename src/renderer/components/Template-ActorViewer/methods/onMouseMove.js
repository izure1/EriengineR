export default function (e) {

  if (this.isMouseRightDown) {
    this.cameraLeft -= this.calcScale(e.movementX)
    this.cameraBottom += this.calcScale(e.movementY)
  }

}