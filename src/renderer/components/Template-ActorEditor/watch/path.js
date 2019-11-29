export default function () {

  this.actor = this.readFromFile()

  this.unwatchFile()
  this.watchFile()

}