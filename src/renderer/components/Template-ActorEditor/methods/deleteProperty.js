export default function (section, property) {

  delete section[property]
  this.saveFile()

}