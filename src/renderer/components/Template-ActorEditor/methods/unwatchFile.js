export default function () {

  if (!this.watcher) {
    return
  }

  this.watcher.close()

}