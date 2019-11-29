export default function (e) {

  if (this.isMouseRightDown) {
    this.moveCamera(e.movementX, e.movementY)
  }

}