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

  constructor(x = 200, y = 200) {
    this.id = createUUID()
    this.events = []
    this.conditions = []
    this.actions = []
    this.nexts = []
    this.position = {
      x,
      y
    }
    this.comment = ''
  }

}


export {
  Script,
  ScriptContext
}