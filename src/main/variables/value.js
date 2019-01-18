import {
  dialog
} from 'electron'


function setValue(data, properties, value) {
  eval(`(arguments[0].${arguments[1]} = arguments[2])`)
}

function getValue(data, properties) {
  return eval(`(arguments[0].${arguments[1]})`)
}


export {
  setValue,
  getValue
}