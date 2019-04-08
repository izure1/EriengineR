let fn = {}


// Enter
fn[13] = function (p) {
  this.isFolder ? this.toggle() : this.openThis(p)
}

// F2
fn[113] = function (p) {
  this.requestModifyName()
}


export default fn