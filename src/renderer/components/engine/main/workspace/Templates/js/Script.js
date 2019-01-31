import createUUID from '@static/js/createUUID'


class ScriptContext {

  constructor() {

    this.id = null
    this.cid = null
    this.text = ''
    this.variables = {}

  }

  from(option = {}) {
    for (let p in option) this[p] = option[p]
  }

  getDescriptionFromMacro(macro) {

    description = macro.description
    description = description.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, match => {

      match = match.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, '$1')
      match = this.variables[match] || variables[match].text

      return match

    })

    return description

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