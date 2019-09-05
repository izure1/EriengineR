export default function (disabledOnTop = false, onlyOnTop = false) {

  if (this.isTop && disabledOnTop) {
    return true
  }

  if (!this.isTop && onlyOnTop) {
    return true
  }

  return false

}