import {
  getValue,
  setValue
} from './value'

export default function setVariables(e, properties, value) {

  setValue(data, properties, value)
  e.returnValue = getValue(this.variables, properties)

}