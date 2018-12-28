import createUUID from '@static/js/createUUID'


class ScriptContext {

  constructor() {
    this.id = createUUID()
    this.cid = null
    this.arguments = {}
    this.position = {
      x: 0,
      y: 0
    }
  }

  get text() {

  }

}

class Script {

  constructor() {
    this.id = createUUID()
    this.events = []
    this.conditions = []
    this.actions = []
    this.nexts = []
    this.comment = ''
  }

}


export {
  Script,
  ScriptContext
}