export default function () {

  if (this.top !== this) {
    return
  }

  this.watcher.close()

}