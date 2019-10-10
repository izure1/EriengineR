export default function (ctx) {

  if (ctx.separator) {

    let v = this.separatorVisiblity
    this.separatorVisiblity = false
    
    return v

  } else {

    if (!!ctx.onlyDirectory === !!ctx.onlyFile) {
      return this.separatorVisiblity = true
    }

    if (this.isFolder && ctx.onlyDirectory) {
      return this.separatorVisiblity = true
    }

    if (!this.isFolder && ctx.onlyFile) {
      return this.separatorVisiblity = true
    }

    return this.separatorVisiblity = false

  }

}