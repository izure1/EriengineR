export default function () {

  let drags = this.$el.querySelector('.template-treeview-itemwrap')
  let drops = this.$el.querySelector('.template-treeview-itemwrap')

  this.draggable.setDrag(drags)
  this.draggable.setDrop(drops)

  this.draggable.dragstart((e, dataTransfer) => {
    this.setDragItem(e, dataTransfer)
  })

  this.draggable.drop((e, dataTransfer) => {
    this.dropItem(e, dataTransfer)
  })

  if (!this.configurable) {
    this.draggable.disable()
  }

}