export default function () {

  let t
  if (this.isTop) {
    return
  }

  this.modifyMode = true
  this.$nextTick(() => {
    t = this.$el.querySelector('input')
    t.value = this.tree.name
    t.focus()
    t.setSelectionRange(0, t.value.lastIndexOf('.'))
  })

}