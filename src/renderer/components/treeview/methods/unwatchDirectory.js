export default function () {

  if (this.top !== this) {
    return
  }

  if (this.watcher) {
    this.watcher.close()
  }

}