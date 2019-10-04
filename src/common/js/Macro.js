import createUUID from '@common/js/createUUID'
import {
  Variable,
  VariableParser,
  TextVariable,
  ValueVariable,
  FileVariable,
  RadioVariable
} from './Variable'


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
      variables
    } = i

    this.id = id
    this.origin = origin

    for (let i in variables) {
      this.variables[i] = parser.parseFromInformation(variables[i])
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

}


export default Macro