export default function (e) {

  this.cameraPersp += e.wheelDelta

  if (this.cameraPersp > 50) {
    this.cameraPersp = 50
  }

  this.zoomCamera()
  this.transformPreviewActor(e)

}