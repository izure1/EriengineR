export default function (section, property, value) {

  section[property] = value
  this.saveFile()

}