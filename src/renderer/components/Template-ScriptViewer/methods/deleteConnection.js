export default function (source, target) {

  let script
  let nexts

  script = this.getOriginScript(source)

  nexts = script.nexts
  nexts.splice(nexts.indexOf(target), 1)

  this.saveScript(script)

}