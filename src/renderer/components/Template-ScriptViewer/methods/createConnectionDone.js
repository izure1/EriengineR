export default function (script) {

  let source
  let target
  let nexts

  source = this.connection.source
  target = this.connection.target

  if (!source) {
    return
  }

  if (!target) {
    return
  }

  if (source === target) {
    return
  }

  nexts = new Set(source.nexts)
  nexts.add(target.id)

  source = this.getOriginScript(source.id)
  source.nexts = Array.from(nexts)

  this.saveScript(source)
  this.cancelConnecting()

}