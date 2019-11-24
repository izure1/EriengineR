export default function (news, old) {

  if (this.top !== this) {
    return
  }

  this.unwatchDirectory(old)
  this.watchDirectory()

}