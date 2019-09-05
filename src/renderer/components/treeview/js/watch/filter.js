export default function () {

  if (this.top !== this) {
    return
  }

  this.unwatchDirectory(this.path)
  this.watchDirectory()

}