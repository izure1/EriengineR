export default function (e) {

  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'

  this.createPreviewActor()

}