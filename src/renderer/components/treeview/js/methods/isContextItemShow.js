function isVisible(item) {

  if (!!item.onlyDirectory === !!item.onlyFile) {
    return true
  }

  if (this.isFolder && item.onlyDirectory) {
    return true
  }

  if (!this.isFolder && item.onlyFile) {
    return true
  }

  return false

}


export default function (item, index) {

  if (item.separator) {

    let visible = this.separatorVisible
    this.separatorVisible = false

    return visible

  } else {

    this.separatorVisible = isVisible.call(this, item)
    return this.separatorVisible

  }

}