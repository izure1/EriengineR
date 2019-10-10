import {
  ipcRenderer
} from 'electron'

import {
  Variable,
  VariableParser,
  TextVariable,
  ValueVariable,
  FileVariable,
  RadioVariable
} from './Variable'

import createUID from './createUID'


class Macro {

  constructor() {
    this.id = null
    this.origin = null
    this.variables = {}
  }

  parseFromInformation(i) {

    let parser = new VariableParser
    let {
      id,
      origin,
      variables,
    } = i

    this.id = id
    this.origin = origin


    let macroOrigin
    let macroVariable

    macroOrigin = ipcRenderer.sendSync('macro-get-information', origin)

    for (let i in variables) {

      macroVariable = {
        ...macroOrigin.variables[i],
        ...variables[i]
      }

      this.variables[i] = parser.parseFromInformation(macroVariable)

    }

  }

  setVariable(property, variable) {

    if (!variable instanceof Variable) {
      throw `${JSON.stringify(variable)} is not instance of 'Variable' Class.`
    }

    this.variables[property] = variable

  }

  getVariable(property) {
    return this.variables[property]
  }

  parseDescription(description) {

    return description.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, match => {

      match = match.replace(/\{{2}\s*(.*?)\s*\}{2}/gmi, '$1')
      match = this.variables[match].text

      return match

    })

  }

  copy() {

    let copy

    copy = new Macro
    copy.parseFromInformation(this)
    copy.id = createUID()
    
    for (let i in this.variables) {
      copy.variables[i] = this.variables[i].copy()
    }

    return copy

  }

}


export default Macro