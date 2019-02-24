import createUUID from '@static/js/createUUID'


class Macro {

  constructor(option = {}) {

    this.id = createUUID()
    this.macro = null
    this.text = ''
    this.variables = {}

    for (let p in option) this[p] = option[p]

  }

  static deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  from(option = {}) {

    for (let p in option) {
      this[p] = option[p]
    }

    return this

  }

  fromMacro(macro) {

    this.macro = macro.cid
    this.variables = Macro.deepCopy(macro.variables)

    return this

  }

  getDescriptionFromMacro(macro, language) {

    let description

    description = macro.description
    description = description.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, match => {

      match = match.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, '$1')
      match = this.variables[match]


      if (!match) {
        return '(삭제됨)'
      }

      if (typeof match.text === 'object') {
        match = language in match.text ? match.text[language] : '(없음)'
      }
      else match = match.text

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
  Macro
}