export default function (e, fn, itempath, disabledOnTop = false, onlyOnTop = false) {

  e.preventDefault()
  e.stopPropagation()

  if (this.isTop && disabledOnTop) {
    return
  }

  if (!this.isTop && onlyOnTop) {
    return
  }

  fn.call(this.top.$parent, e, itempath, this)

  this.contextmenu_info.open = false

}