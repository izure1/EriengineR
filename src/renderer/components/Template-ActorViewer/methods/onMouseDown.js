export default function (e) {

  switch (e.which) {
    case 1:
      this.isMouseLeftDown = true
      break

    case 2:
      this.isMouseWheelDown = true
      this.cameraPersp = 0
      this.zoomCamera()
      this.transformPreviewActor(e)
      break
      
    case 3:
      this.isMouseRightDown = true
      this.$store.state.actorDesign = null
      this.removePreviewActor()
      break
  }

}