import {
  getValue
} from './value'

export default function getVariables(e, properties) {

  e.returnValue = getValue(this.variables, properties)

}