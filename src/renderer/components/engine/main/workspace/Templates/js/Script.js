import createUUID from '@/js/createUUID'


class ScriptContext {

  constructor() {
    this.id = createUUID()
    this.macro = null
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


export default {
  Script,
  ScriptContext
}