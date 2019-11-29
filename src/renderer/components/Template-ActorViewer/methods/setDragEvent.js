export default function () {

  this.draggable.setDrop(this.$el.querySelector('.actor-canvas'))

  this.draggable.dragenter((e, dataTransfer) => {
    this.onDragEnter(e, dataTransfer)
  })

  this.draggable.dragover((e, dataTransfer) => {
    this.onDragOver(e, dataTransfer)
  })

  this.draggable.dragleave((e, dataTransfer) => {
    this.onDragLeave(e, dataTransfer)
  })

  this.draggable.drop((e, dataTransfer) => {
    this.onDrop(e, dataTransfer)
  })

}